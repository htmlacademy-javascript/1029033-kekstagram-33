Feature: 2. Редактирование изображения и ограничения, накладываемые на поля

  Background: Открываю сайт и загружаю изображение
    Given подменяю запрос на загрузку данных
    Given подменяю запрос на отправку данных
    Given нахожусь на главной странице сайта
    When выбираю изображение для загрузки

  Scenario: 2.1. Изменение масштаба
    Then значение поля '.scale__control--value' равно '100%'
    When кликаю по элементу '.scale__control--smaller'
    Then значение поля '.scale__control--value' равно '75%'
    Then масштаб изображения равен '0.75'
    When кликаю по элементу '.scale__control--smaller'
    Then значение поля '.scale__control--value' равно '50%'
    Then масштаб изображения равен '0.5'
    When кликаю по элементу '.scale__control--smaller'
    Then значение поля '.scale__control--value' равно '25%'
    Then масштаб изображения равен '0.25'
    When кликаю по элементу '.scale__control--smaller'
    Then значение поля '.scale__control--value' равно '25%'
    Then масштаб изображения равен '0.25'
    When кликаю по элементу '.scale__control--bigger'
    Then значение поля '.scale__control--value' равно '50%'
    Then масштаб изображения равен '0.5'
    When кликаю по элементу '.scale__control--bigger'
    Then значение поля '.scale__control--value' равно '75%'
    Then масштаб изображения равен '0.75'
    When кликаю по элементу '.scale__control--bigger'
    Then значение поля '.scale__control--value' равно '100%'
    Then масштаб изображения равен '1'
    When кликаю по элементу '.scale__control--bigger'
    Then значение поля '.scale__control--value' равно '100%'
    Then масштаб изображения равен '1'

  Scenario: 2.2. Появление и исчезновение слайдера
    Then элемент '.img-upload__effect-level' невидим
    Then элемент '.effect-level__slider' невидим
    When кликаю по элементу '.effects__preview--chrome'
    Then элемент '.img-upload__effect-level' видим
    Then элемент '.effect-level__slider' видим
    When кликаю по элементу '.effects__preview--none'
    Then элемент '.img-upload__effect-level' невидим
    Then элемент '.effect-level__slider' невидим
    When кликаю по элементу '.effects__preview--chrome'
    Then элемент '.img-upload__effect-level' видим
    Then элемент '.effect-level__slider' видим

  Scenario: 2.2. Сброс значения при переключении фильтра
    When кликаю по элементу '.effects__preview--chrome'
    When перемещаю ползунок на '5' делений влево
    Then значение поля '.effect-level__value' равно '0.5'
    When кликаю по элементу '.effects__preview--sepia'
    Then значение поля '.effect-level__value' равно '1'

  Scenario: 2.2. Наложение эффекта на изображение
    When кликаю по элементу '.effects__preview--chrome'
    Then на изображение накладывается фильтр 'grayscale' со значением '1'
    When перемещаю ползунок на '5' делений влево
    Then на изображение накладывается фильтр 'grayscale' со значением '0.5'
    When кликаю по элементу '.effects__preview--sepia'
    Then на изображение накладывается фильтр 'sepia' со значением '1'
    When перемещаю ползунок на '5' делений влево
    Then на изображение накладывается фильтр 'sepia' со значением '0.5'
    When кликаю по элементу '.effects__preview--marvin'
    Then на изображение накладывается фильтр 'invert' со значением '1'
    When перемещаю ползунок на '5' делений влево
    Then на изображение накладывается фильтр 'invert' со значением '0.95'
    When кликаю по элементу '.effects__preview--phobos'
    Then на изображение накладывается фильтр 'blur' со значением '3px'
    When перемещаю ползунок на '5' делений влево
    Then на изображение накладывается фильтр 'blur' со значением '2.5px'
    When кликаю по элементу '.effects__preview--heat'
    Then на изображение накладывается фильтр 'brightness' со значением '3'
    When перемещаю ползунок на '5' делений влево
    Then на изображение накладывается фильтр 'brightness' со значением '2.5'
    When кликаю по элементу '.effects__preview--none'
    Then на изображение не накладывается фильтр

  Scenario: 2.3. Ограничение: хэш-тег начинается с символа #:
    When в поле '.text__hashtags' ввожу текст 'qwerty'
    When кликаю по элементу '.img-upload__submit'
    Then элемент '.pristine-error' видим

  Scenario: 2.3. Ограничение: хеш-тег не может состоять только из одной решётки:
    When в поле '.text__hashtags' ввожу текст '#'
    When кликаю по элементу '.img-upload__submit'
    Then элемент '.pristine-error' видим

  Scenario: 2.3. Ограничение: хеш-тег не может содержать спецсимволы (#, @, $ и т. п.):
    When в поле '.text__hashtags' ввожу текст '##'
    When кликаю по элементу '.img-upload__submit'
    Then элемент '.pristine-error' видим
    When очищаю поле '.text__hashtags'
    When в поле '.text__hashtags' ввожу текст '#@'
    When кликаю по элементу '.img-upload__submit'
    Then элемент '.pristine-error' видим
    When очищаю поле '.text__hashtags'
    When в поле '.text__hashtags' ввожу текст '#$'
    When кликаю по элементу '.img-upload__submit'
    Then элемент '.pristine-error' видим

  Scenario: 2.3. Ограничение: хеш-тег не может содержать символы пунктуации (тире, дефис, запятая и т. п.):
    When в поле '.text__hashtags' ввожу текст '#q-w'
    When кликаю по элементу '.img-upload__submit'
    Then элемент '.pristine-error' видим
    When очищаю поле '.text__hashtags'
    When в поле '.text__hashtags' ввожу текст '#q–w'
    When кликаю по элементу '.img-upload__submit'
    Then элемент '.pristine-error' видим
    When очищаю поле '.text__hashtags'
    When в поле '.text__hashtags' ввожу текст '#q,w'
    When кликаю по элементу '.img-upload__submit'
    Then элемент '.pristine-error' видим

  Scenario: 2.3. Ограничение: хеш-тег не может содержать эмодзи:
    When в поле '.text__hashtags' ввожу текст '#😀'
    When кликаю по элементу '.img-upload__submit'
    Then элемент '.pristine-error' видим

  Scenario: 2.3. Ограничение: максимальная длина одного хэш-тега 20 символов, включая решётку:
    When в поле '.text__hashtags' ввожу текст '#q #qwertyuiopasdfghjklzx'
    When кликаю по элементу '.img-upload__submit'
    Then элемент '.pristine-error' видим

  Scenario: 2.3. Ограничение: один и тот же хэш-тег не может быть использован дважды (регистр неважен):
    When в поле '.text__hashtags' ввожу текст '#q #Q'
    When кликаю по элементу '.img-upload__submit'
    Then элемент '.pristine-error' видим

  Scenario: 2.3. Ограничение: нельзя указать больше пяти хэш-тегов:
    When в поле '.text__hashtags' ввожу текст '#q #w #e #r #t #y'
    When кликаю по элементу '.img-upload__submit'
    Then элемент '.pristine-error' видим

  Scenario: 2.3. Хэш-теги необязательны:
    When в поле '.text__hashtags' ввожу текст '#'
    When очищаю поле '.text__hashtags'
    When кликаю по элементу '.img-upload__submit'
    Then элемент '.img-upload__overlay' невидим
    When нажимаю клавишу 'esc'
    When выбираю изображение для загрузки
    Then элемента '.pristine-error' нет на странице

  Scenario: 2.3. Ввод валидных хэш-тегов не вызывает ошибки:
    When в поле '.text__hashtags' ввожу текст '#q #W #й #Ц    #r'
    When кликаю по элементу '.img-upload__submit'
    Then элемент '.img-upload__overlay' невидим
    When нажимаю клавишу 'esc'
    When выбираю изображение для загрузки
    Then элемента '.pristine-error' нет на странице

  Scenario: 2.3. При вводе валидных хэш-тегов ошибка сбрасывается:
    When в поле '.text__hashtags' ввожу текст '#'
    When кликаю по элементу '.img-upload__submit'
    Then элемент '.pristine-error' видим
    When в поле '.text__hashtags' ввожу текст 'q #W #й #Ц    #r'
    When кликаю по элементу '.img-upload__submit'
    Then элемент '.img-upload__overlay' невидим
    When нажимаю клавишу 'esc'
    When выбираю изображение для загрузки
    Then элемента '.pristine-error' нет на странице

  Scenario: 2.3. Если фокус находится в поле ввода хэш-тега, нажатие на Esc не закрывает форму:
    When фокусирую поле '.text__hashtags'
    When нажимаю клавишу 'esc'
    Then элемент '.img-upload__overlay' видим

  Scenario: 2.4. Комментарий не обязателен:
    When в поле '.text__description' ввожу текст 'q'
    When очищаю поле '.text__description'
    When кликаю по элементу '.img-upload__submit'
    Then элемент '.img-upload__overlay' невидим
    When нажимаю клавишу 'esc'
    When выбираю изображение для загрузки
    Then элемента '.pristine-error' нет на странице

  Scenario: 2.4. Ограничение: длина комментария не может составлять больше 140 символов:
    When в поле '.text__description' ввожу текст 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel eros nulla. Etiam nec sodales leo. Ut facilisis orci non dolor dapibus nec.'
    When кликаю по элементу '.img-upload__submit'
    Then элемент '.pristine-error' видим

  Scenario: 2.4. Ввод валидного комментария не вызывает ошибки:
    When в поле '.text__description' ввожу текст 'qwerty'
    When кликаю по элементу '.img-upload__submit'
    Then элемент '.img-upload__overlay' невидим
    When нажимаю клавишу 'esc'
    When выбираю изображение для загрузки
    Then элемента '.pristine-error' нет на странице

  Scenario: 2.4. При вводе валидного комментария ошибка сбрасывается:
    When в поле '.text__description' ввожу текст 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel eros nulla. Etiam nec sodales leo. Ut facilisis orci non dolor dapibus nec.'
    When кликаю по элементу '.img-upload__submit'
    Then элемент '.pristine-error' видим
    When очищаю поле '.text__description'
    When в поле '.text__description' ввожу текст 'qwerty'
    When кликаю по элементу '.img-upload__submit'
    Then элемент '.img-upload__overlay' невидим
    When нажимаю клавишу 'esc'
    When выбираю изображение для загрузки
    Then элемента '.pristine-error' нет на странице

  Scenario: 2.4. Если фокус находится в поле ввода комментария, нажатие на Esc не закрывает форму:
    When фокусирую поле '.text__description'
    When нажимаю клавишу 'esc'
    Then элемент '.img-upload__overlay' видим
