const generateUtils = (instance) => {
  const newInstance = instance;

  return {
    getFileSizeInBytes(size) {
      return size * 1024 * 1024;
    },
    getFileExtention(fileType, enableLowerCase = false) {
      const extention = fileType.split("/")[1];

      return enableLowerCase ? extention.toLowerCase() : extention;
    },
    enhanceFileName(file) {
      // animals.sd.png ===> png
      const extention = this.getFileExtention(file.type);
      const extensionWithDot = `.${extention}`;
      const name = file.name.split(extensionWithDot)[0];

      const displayedName = newInstance.enableFullnameDisplay
        ? name
        : name.slice(0, newInstance.maxDisplayNameLength);

      return `${displayedName}${extensionWithDot.toLowerCase()}`;
    },
    getFileSizeInKiloByte(sizeInBytes) {
      const sizeInKiloByte = parseFloat(sizeInBytes / 1024).toFixed(2);

      return `${sizeInKiloByte} ك.ب`;
    },
    getAllowedMaxFileSizeText(maxFilesSizeInMega) {
      return `كحد أقصى ${maxFilesSizeInMega} م.ب`;
    },
    getAllowedFileTypesText(allowedExtentions) {
      return `نوع الملف يجب أن يكون ${allowedExtentions}`;
    },
    generateFileDownloadUrl(url, name) {
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      a.click();
    },
    onDownloadFile(file) {
      const { baseFile, downloadUrl, name } = file;

      if (baseFile) {
        fetch(baseFile)
          .then((res) => res.blob())
          .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            this.generateFileDownloadUrl(url, name);
          });
      } else if (downloadUrl) {
        this.generateFileDownloadUrl(downloadUrl, name);
      } else {
        const url = window.URL.createObjectURL(file);
        this.generateFileDownloadUrl(url, name);
      }
    },
    dispatchError(target = "", name = "") {
      const error = this.getSelectedError(name)[target];
      newInstance.error = error;

      newInstance.$emit("error", {
        name: this.name,
        code: target,
        error,
      });

      newInstance.$refs.file.value = "";
    },
    getSelectedError(fileName) {
      const { maxFileSizeInMega, maxFilesSizeInMega } = newInstance;

      return {
        fieldIsRequired: "هذا الحقل مطلوب",
        maxFileSizeExceeded: ` الملف ${fileName} تجاوز الحد المسموح به  وهو ${maxFileSizeInMega} م.ب`,
        maxFilesSizeExceeded: ` تم تجاوز الحد المسموح به لجميع الملفات وهو ${maxFilesSizeInMega} م.ب`,
        fileExtention: `امتداد الملف ${fileName} غير مسموح به`,
      };
    },
    onDeleteFile(index) {
      const file = newInstance.enableServerSide
        ? newInstance.selectedFiles[index].file
        : newInstance.selectedFiles[index];
      newInstance.selectedFiles.splice(index, 1);

      if (!newInstance.selectedFiles.length && newInstance.isRequired) {
        this.dispatchError("fieldIsRequired");
      }

      // update total size and (|| 0 ---> is For to validate that file is not NaN if the provided file is corrupted)
      newInstance.currentTotalSize -= file.size || 0;
      // update parent
      newInstance.$emit("select", newInstance.updatedValue);
    },
    isValidFile(file) {
      const enhancedAcceptedExtentions = newInstance.accept.toLowerCase();
      // .ZIP ==> ZIP
      // const
      const extention = this.getFileExtention(file.type, true).slice(1);
      const isValidExtention = enhancedAcceptedExtentions.includes(extention);
      const isValidSize = this.isValidFileSize(file.size, file.name);

      if (!isValidExtention) {
        return this.dispatchError("fileExtention", file.name);
      }

      return isValidExtention && isValidSize;
    },
    isValidFileSize(fileSize, fileName) {
      const isValidSizeLimit =
        fileSize <= this.getFileSizeInBytes(newInstance.maxFileSizeInMega);

      const isValidCurrentSize = newInstance.validateOnSingleFileSize
        ? isValidSizeLimit
        : true;
      const isValidWithTotalSize =
        newInstance.currentTotalSize + fileSize <=
        this.getFileSizeInBytes(newInstance.maxFilesSizeInMega);

      if (!isValidCurrentSize) {
        this.dispatchError("maxFileSizeExceeded", fileName);
      }

      if (!isValidWithTotalSize) {
        this.dispatchError("maxFilesSizeExceeded");
      }

      return isValidCurrentSize && isValidWithTotalSize;
    },
    onClientSideSelect(e) {
      const { files } = e.target;
      const firstFile = files[0];

      if (newInstance.resetErrorOnSelect && newInstance.error) {
        newInstance.error = "";
      }

      if (!newInstance.isMultiple && this.isValidFile(firstFile)) {
        firstFile.displayName = this.enhanceFileName(firstFile);
        newInstance.selectedFiles = [firstFile];
      }

      if (newInstance.isMultiple) {
        for (let i = 0; i < files.length; i += 1) {
          const file = files[i];

          if (newInstance.addAttachmentAllowed && this.isValidFile(file)) {
            file.displayName = this.enhanceFileName(file);
            newInstance.selectedFiles.push(file);
            // update total size
            newInstance.currentTotalSize += file.size;
          }
        }
      }
      // reset field value
      newInstance.$refs.file.value = "";

      newInstance.$emit("select", newInstance.updatedValue);
    },
    async onServerSideSelect(e) {
      newInstance.isServerLoading = true;

      const { files } = e.target;
      const selectedFile = files[0];

      if (newInstance.resetErrorOnSelect && newInstance.error) {
        newInstance.error = "";
      }

      if (this.isValidFile(selectedFile)) {
        selectedFile.displayName = this.enhanceFileName(selectedFile);

        const base64Meta = await this.convertFileToBase64(selectedFile);

        if ("base64" in base64Meta) {
          const sharepointId = await newInstance.uploadCallback(base64Meta);

          if (sharepointId) {
            const constructedAttachment = {
              id: 0,
              attachmentTypeId: newInstance.attachmentTypeId,
              contentType: base64Meta.contentType,
              sharepointId,
              fileName: selectedFile.name,
              file: selectedFile,
            };

            if (newInstance.isMultiple) {
              newInstance.selectedFiles.push(constructedAttachment);
            } else {
              newInstance.selectedFiles = [constructedAttachment];
            }

            newInstance.currentTotalSize += selectedFile.size;
            newInstance.$emit("select", newInstance.updatedValue);
          }
        }
        // reset field value
        newInstance.$refs.file.value = "";
      }

      newInstance.isServerLoading = false;
    },
    // converters
    base64ToFilesConverter(file) {
      return new Promise((resolve) => {
        fetch(file.baseFile)
          .then((res) => res.blob())
          .then((blob) => {
            const createdFileExtention = file.baseFile
              .split(";")[0]
              .split(":")[1];
            const createdFile = new File([blob], file.name, {
              type: createdFileExtention,
            });

            createdFile.displayName = this.enhanceFileName(createdFile);

            resolve(createdFile);
          });
      });
    },
    convertFileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const source = reader.result;
          const base64 = source.split(",")[1];
          const contentType = source.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];

          resolve({
            source,
            base64,
            contentType,
          });
        };
        reader.onerror = (error) => reject(error);
      });
    },
  };
};

export default generateUtils;
