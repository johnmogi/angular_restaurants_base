0. :Inspirational:  
https://youtu.be/Fcr-gM-QThc
https://code-maze.com/angular-material-navigation/

[BUILD] ng new client --routing

01. DI - Dependency Injection
זהו מצב בו הסביבה עצמה (אנגולר) יוצרת עבורנו אובייקט
ואנו מקבלים אותו מוכן.
יתרונות:
 שימוש חוזר באותו האובייקט
 מניעת הצורך ליצור אותו בעצמנו
בדיקות - המערכת יכולה ליצור עבורנו אובייקטים כאלו ועוד
משמעות השם: 
Dependency - כי ה-Component שלנו תלוי באובייקט הזה.
Injection - כי זה נחשב שהמערכת יוצרת את האוביקט
ו"מזריקה" אותו אלינו ל-Component.

02. [ROUTE] guide:  
const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "products", component: ProductsComponent },
    { path: "products/new", component: InsertComponent },
    { path: "products/:prodID", component: DetailsComponent },
    { path: "about", component: AboutComponent },
    // { path: "admin", loadChildren: "./admin/admin.module#AdminModule" }, // Lazy Loading
    { path: "admin", loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule) }, // Lazy Loading
    { path: "", redirectTo: "/home", pathMatch: "full" }, // full = exact
    { path: "**", component: PageNotFoundComponent }
];
ng g s services/getBooks --skipTests

1. Theme up components  
ng g c components/layouts/layout --skipTests
ng g c components/layouts/header --skipTests
ng g c components/layouts/main --skipTests
ng g c components/layouts/sidebar --skipTests
ng g c components/layouts/footer --skipTests
ng g c components/pages/home --skipTests
ng g c components/pages/restaurants --skipTests
ng g c components/pages/about --skipTests
ng g c components/pages/contact --skipTests
ng g c components/pages/auth --skipTests
ng g c components/pages/auth/login --skipTests
ng g c components/pages/auth/logout --skipTests
ng g c components/pages/auth/register --skipTests


npm i --save @angular/material @angular/cdk

<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">


cd app/ mkdir redux  

3. Redux info:
ארכיטקטורה המנהלת מידע ברמת האפליקציה והמאפשרת להחזיק את המידע במקום אחד. המידע נקרא ב-AppState.
כל אזור באפליקציה שרוצה לשלוח מידע ל-AppState יכול לבצע זאת.
כל אזור באפליקציה שרוצה לקבל עדכונים מה-AppState יכול לבצע זאת.
המונחים החשובים: 
A. AppState - המידע הקיים בכל האפליקציה.
B. ActionType - סוג הפעולה הניתנת לביצוע (Enum). לדוגמה: עדכון כל המוצרים מהשרת. לדוגמה: הוספת מוצר חדש. לדוגמה: מחיקת מוצר.
C. Payload (מטען) -
 המידע עצמו שאנו משתמשים בו בביצוע פעולה. לוגמה: כל המוצרים. לדוגמה: מוצר בודד: לדוגמה: קוד מוצר. אבל, לא בהכרח חובה לשלוח Payload.
D. Action - תאור פעולה לביצוע - מכיל שני דברים: א. ActionType - איזו פעולה אנו רוצים לבצע. ב. Payload - מה המידע הקשור לפעולה.
E. Reducer - פונקציה שמבצעת את כל הפעולות.
חוק: אסור ל-Reducer לשנות את ה-AppState המקורי שנשלח אליו. הוא חייב לייצר AppState חדש, לשנות אותו ולהחזיר אותו.
F. Store - האובייקט שמנהל הכל. מכיר גם את ה-AppState (מכיל אותו) ומכיר גם את ה-Reducer (מפעיל אותו).
G. Dispatch - שליחת Action ל-Store לביצוע.
H. Subscribe - האזנה לשינויים שהתבצעו ב-Store.
התקנת Redux:
npm i redux


4. touch action-type.ts:      
export enum ActionType {GetAllBooks}

5. touch action.ts:
import { ActionType } from './action-type';
export interface Action {
    type: ActionType;
    payload?: any; // Optional!
}

6. touch app-state:
import { BookModel } from '../models/book-model';
export class AppState {
    public books: BookModel[];
    public constructor() {
        this.books = [];
    }
}

7. touch reducer.ts:
import { AppState } from './app-state';
import { Action } from './action';
import { ActionType } from './action-types';
export function reducer
(oldAppState: AppState, action: Action): AppState {
    const newAppState = { ...oldAppState }; 
    // Spread Operator
    switch(action.type) {
        case ActionType.GetAllBooks:
            newAppState.books = action.payload;
            break;
    }
    return newAppState;
}

8. touch store.ts:
npm i redux
import { createStore } from "redux";
import { reducer } from './reducer';
import { AppState } from './app-state';
export const store = createStore(reducer, new AppState())


4. directive guide:  

5. Service guide - fetch + calculate:  
include HttpClientModule along with import on app.ts
npm i rxjs


assignments:

LAZY LOAD
REDUX
RXJS
DIRECTIVE
SERVICES


7. Questions for Assaf / other:  
__in angular, redux- how to unsubscribe?
__global variable import in angular client such as port