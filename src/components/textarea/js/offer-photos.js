'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var photoContainerElement = document.querySelector('.form__photo-container');
  var photoInputElement = photoContainerElement.querySelector('input[type="file"]');
  var previewContainerElement = photoContainerElement.querySelector('.form__preview-container');
  var draggedElement = null;

  var clickHandler = function (evt) {
    evt.preventDefault();
    evt.target.remove();
  };

  var dragStartHandler = function (evt) {
    draggedElement = evt.target;
  };

  var dropHandler = function (evt) {
    var previewElements = previewContainerElement.querySelectorAll('.form__photo');
    var draggedElementIndex = [].indexOf.call(previewElements, draggedElement);
    var aimElementIndex = [].indexOf.call(previewElements, evt.target);

    if (draggedElementIndex > aimElementIndex) {
      previewContainerElement.insertBefore(draggedElement, evt.target);
    } else {
      previewContainerElement.insertBefore(draggedElement, evt.target.nextSibling);
    }

    evt.preventDefault();
  };

  var createPreview = function (file) {
    var fileName = file.name.toLowerCase();
    var isRightFormat = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (isRightFormat) {
      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.addEventListener('load', function () {
        var previewElement = document.createElement('div');
        previewElement.classList.add('form__photo');
        previewElement.style.backgroundImage = 'url(' + reader.result + ')';
        previewElement.draggable = true;
        previewElement.addEventListener('click', clickHandler);
        previewElement.addEventListener('dragstart', dragStartHandler);
        previewElement.addEventListener('drop', dropHandler);

        previewContainerElement.appendChild(previewElement);
      });
    }
  };

  previewContainerElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  });

  photoInputElement.addEventListener('change', function () {
    var uploadedfiles = photoInputElement.files;
    Object.keys(uploadedfiles).forEach(function (element) {
      createPreview(uploadedfiles[element]);
    });
  });
})();
