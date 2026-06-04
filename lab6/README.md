# Лабораторна робота №6

## Тема

Побудова авторизації та збереження персональних даних у React Native з використанням Firebase Authentication та Firestore


## Мета

Набути практичних навичок інтеграції авторизації та обробки персональних даних користувача в мобільному застосунку.

## Інструкція запуску

1. Клонувати репозиторій:

```bash
git clone https://github.com/rock7492/MobileLabsRN2026.git
cd MobileLabsRN2026/lab6
```

2. Встановити залежності:

```bash
npm install
```

3. Створити файл .env у корені проєкту та додати конфігурацію Firebase:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. У Firebase Console:

- Увімкнути Authentication -> Email/Password;
- Створити Firestore Database;
- Додати правила доступу (firestore.rules).

5. Запустити проєкт:

```bash
npx expo start --android
```

## Опис реалізованого функціоналу

У застосунку реалізовано повноцінну систему авторизації користувача з використанням Firebase Authentication, що включає реєстрацію за email і паролем, вхід у систему та вихід з неї. 
Після успішної реєстрації автоматично створюється профіль користувача, який зберігається у Firestore у колекції users, де ідентифікатор документа відповідає uid користувача. 
Користувач має можливість переглядати, редагувати та зберігати свої персональні дані, зокрема ім’я, вік та місто.

Реалізовано захист доступу до даних: кожен користувач може працювати лише зі своїм документом у базі даних. 
Це забезпечено як на рівні клієнтського коду, так і через Firestore Security Rules, які перевіряють відповідність uid. 
Навігація в застосунку побудована з використанням Expo Router із розділенням маршрутів на групи (auth) та (app), що дозволяє автоматично перенаправляти неавторизованих користувачів на екран входу.

Реалізовано функціонал відновлення пароля через email із використанням Firebase API. Користувач може отримати лист із посиланням для зміни пароля. 
Також передбачено можливість видалення облікового запису з обов’язковою повторною автентифікацією для підвищення безпеки. Після видалення акаунта відповідні дані також видаляються з Firestore.

## Скріншоти

<img width="300" height="631" alt="Screenshot_20260604_020516" src="https://github.com/user-attachments/assets/d09a9221-b048-4589-b979-a0ea04bf2bab" />
<img width="300" height="631" alt="Screenshot_20260604_020452" src="https://github.com/user-attachments/assets/e39de10b-299b-4e1c-a318-b4a919ed7139" />
<img width="300" height="631" alt="Screenshot_20260604_020334" src="https://github.com/user-attachments/assets/f5809a56-7ae8-437d-9da7-4eed9ce28332" />
<img width="300" height="631" alt="Screenshot_20260604_015756" src="https://github.com/user-attachments/assets/f37842e1-deff-4fd9-99f7-55ba9ec4a0d0" />
<img width="300" height="631" alt="Screenshot_20260604_015157" src="https://github.com/user-attachments/assets/6c55acb4-b3b2-4e19-87c5-34f3023ba9f9" />
<img width="300" height="631" alt="Screenshot_20260604_003011" src="https://github.com/user-attachments/assets/ef5d4cd8-192b-4c83-aa81-472591f1823e" />


## Висновки

У ході виконання лабораторної роботи набули практичних навичок інтеграції, авторизації та обробки персональних даних користувача в мобільному застосунку.
