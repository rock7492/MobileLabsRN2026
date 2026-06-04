# Лабораторна робота №4

## Тема

Робота з файловою системою в React Native з використанням бібліотеки expo-file-system

## Мета

Опанувати механізми роботи з локальною файловою системою мобільного пристрою, використовуючи можливості бібліотеки expofile-system. 
Закріпити навички реалізації базових операцій над файлами й папками, організації файлової навігації та аналізу стану файлової системи.

## Інструкція запуску

1. Клонувати репозиторій:

```bash
git clone https://github.com/rock7492/MobileLabsRN2026.git
cd MobileLabsRN2026/lab4
```

2. Встановити залежності:

```bash
npm install
```

3. Запустити проєкт:

```bash
npx expo start --android
```

## Опис реалізованого функціоналу

Основний функціонал охоплює навігацію по файловій системі з відображенням поточного шляху, можливістю переходу між вкладеними папками та повернення на попередній рівень. Користувач може створювати нові папки та текстові файли з початковим вмістом, відкривати .txt файли для перегляду і редагування, а також зберігати внесені зміни.

Для керування файлами реалізовано перейменування та видалення з підтвердженням дії, що забезпечує контроль над змінами у файловій системі. Додатково доступний перегляд детальної інформації про об’єкти, включаючи назву, тип, розмір, дату останньої модифікації та шлях до файлу.

На головному екрані відображається статистика використання памʼяті пристрою: загальний обсяг, вільний та зайнятий простір, що дозволяє оцінити стан сховища.

## Скріншоти

<img width="300" height="631" alt="Screenshot_20260530_014025" src="https://github.com/user-attachments/assets/e1ef74bf-8402-4f19-b9e0-9e53ab1bcd24" />
<img width="300" height="631" alt="Screenshot_20260530_014014" src="https://github.com/user-attachments/assets/9f4b810c-e905-4bf3-bdc3-213b6bc89614" />
<img width="300" height="631" alt="Screenshot_20260530_014002" src="https://github.com/user-attachments/assets/ee4a5b0e-e056-4988-ba55-f65b02999d40" />
<img width="300" height="631" alt="Screenshot_20260530_013700" src="https://github.com/user-attachments/assets/1fe38e5d-d0ea-408e-bd33-293054bbe0e1" />
<img width="300" height="631" alt="Screenshot_20260530_013622" src="https://github.com/user-attachments/assets/11db87bb-dfef-4403-9505-6db565e4cf82" />
<img width="300" height="631" alt="Screenshot_20260530_013551" src="https://github.com/user-attachments/assets/dbd4b80e-8c4e-451d-bd80-18f64a85bcda" />
<img width="300" height="631" alt="Screenshot_20260530_013521" src="https://github.com/user-attachments/assets/a84212e7-3a13-4f87-955e-367294b38bbe" />
<img width="300" height="631" alt="Screenshot_20260530_013443" src="https://github.com/user-attachments/assets/fa773896-2b7d-418a-9a17-c566e3529064" />
<img width="300" height="631" alt="Screenshot_20260530_013426" src="https://github.com/user-attachments/assets/c066c7ad-bbba-488d-9338-e2655372c298" />
<img width="300" height="631" alt="Screenshot_20260530_013254" src="https://github.com/user-attachments/assets/02baec01-e7fe-46e2-90b7-8b61e381abd8" />

