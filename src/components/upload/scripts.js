var dropZoneElements = document.querySelectorAll('.js-dropzone');
var uploadInputElements = document.querySelectorAll('.js-uploadinput');

var findAncestor = function (el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls));
  return el;
};

var dragOverHandler = function (evt) {
  evt.preventDefault();
  evt.target.classList.add('upload__input_dropable');
};

var dragLeaveHandler = function (evt) {
  evt.preventDefault();
  evt.target.classList.remove('upload__input_dropable');
};

var removeDragData = function (evt) {
  evt.dataTransfer.clearData();
};

var dropHandler = function (evt) {
  evt.preventDefault();
  var inputElement = document.getElementById(evt.target.htmlFor);
  inputElement.files = evt.dataTransfer.files;

  if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    var changeEvent = new Event('change');
    inputElement.dispatchEvent(changeEvent);
  }
  removeDragData(evt);
};

var badgeClickHandler = function (evt) {
  evt.preventDefault();
  evt.target.remove();
};

var clearBadges = function (badges) {
  if (badges) {
    badges.forEach(function (element) {
      element.remove();
    });
  }
};

var createDocumentPreview = function (file, uploadElement, filetypes) {
  var fileName = file.name.toLowerCase();
  var previewContainerElement = uploadElement.querySelector('.upload__previews');

  var isRightFormat = filetypes.some(function (it) {
    return fileName.endsWith(it);
  });

  if (isRightFormat) {
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.addEventListener('load', function () {
      var fileBadge = document.createElement('button');
      fileBadge.type = 'button';
      fileBadge.classList.add('upload__badge');
      fileBadge.textContent = fileName;
      fileBadge.dataset.filecode = reader.result;
      fileBadge.addEventListener('click', badgeClickHandler);
      previewContainerElement.appendChild(fileBadge);
    })
  } else {
    var fileBadge = document.createElement('button');
    fileBadge.type = 'button';
    fileBadge.textContent = 'Неверный формат файла: ' + fileName;
    fileBadge.classList.add('upload__badge');
    fileBadge.classList.add('upload__badge_error');
    fileBadge.addEventListener('click', badgeClickHandler);
    previewContainerElement.appendChild(fileBadge);
  }
}

dropZoneElements.forEach(function (element) {
  element.addEventListener('dragover', dragOverHandler);
  element.addEventListener('dragleave', dragLeaveHandler);
  element.addEventListener('drop', dropHandler);
});

uploadInputElements.forEach(function (element) {
  var uploadParentElement = findAncestor(element, 'upload');
  var isButtonType = uploadParentElement.classList.contains('upload_button');
  var typesList = element.getAttribute('data-types');
  var types = typesList.replace(/\s/g, '').split(',');

  element.addEventListener('change', function (evt) {
    if (!element.multiple) {
      var currentBadges = uploadParentElement.querySelectorAll('.upload__badge');
      clearBadges(currentBadges);
      createDocumentPreview(element.files[0], uploadParentElement, types);
    } else {
      var uploadedfiles = element.files;
      Object.keys(uploadedfiles).forEach(function (element) {
        createDocumentPreview(uploadedfiles[element], uploadParentElement, types);
      });
    }

    setTimeout(function () {
      if (isButtonType) {
        var buttonElement = uploadParentElement.querySelector('.upload__button');
        var isBadgesExists = uploadParentElement.querySelectorAll('.upload__badge').length;

        if (isBadgesExists && element.multiple) {
          buttonElement.textContent = 'Выбрать ещё файл';
        } else if (isBadgesExists && !element.multiple) {
          buttonElement.textContent = 'Заменить файл другим';
        } else {
          buttonElement.textContent = 'Выбрать файл';
        }
      } else {
        uploadParentElement.querySelector('.upload__dropzone').classList.remove('upload__input_dropable');
      }
    }, 1000);
  });
});
