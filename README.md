# Проект Календарь

Проект выполнен с помощью TS, React, MobX, React Query, axios, SASS modules, Mantine, AG GRID
Проект собран с помощью сборщика webpack

## Инструкция по запуску

Выберите каталог для запуска, откройте в нем окно терминала

### Выполните следующие команды:

клонируйте репозиторий:
### git clone https://github.com/meves/Calendar.git

перейдите в корневой каталог проекта:
### cd Calendar

установите npm модули:
### npm install

#### Перед запуском проверьте, что у вас не занят порт 3000
#### если какое-либо приложение работает на порту 3000, закройте его
#### или установите новое значение от 1 до 65535 в файле package.json => scripts => start => PORT

после установки npm модулей, запустите:
### `npm start`

Приложение будет запущено в отдельной вкладке браузера, если оно не открылось, 
перейдите в бразуер, откройте новую вкладку и  введите адрес:
### [http://localhost:3000](http://localhost:3000) чтобы просмотреть приложение,
если вы меняли порт, то введите его значение вместо 3000

Для завершения работы нажмите ctrl + C, закройте терминал и вкладку браузера

Чтобы выполнить сборку проекта, в коревой директории запустите

### `npm run build`

Приложение будет собрано в production режиме в каталоге build/ в корневой директории проекта
и готово к развертыванию на вашем хостинге, либо на облачной платформе типа GitРub Pages, Vercel  и др.