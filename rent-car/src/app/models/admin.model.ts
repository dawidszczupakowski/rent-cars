export interface AdminModel {
    id?: number;
    login: string;
    haslo: string;
    imie: string;
    nazwisko: string;
    guid?: string;
}

export interface LoginModel {
    login: string;
    haslo: string;
}

export interface LoginSuccessModel {
    guid: string;
    status: string;
}
