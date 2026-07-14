export interface IProfile {
    firstname?: string;
    lastname?: string;
    adress?: IAdresse
}

export interface IAdresse{
    street ? :string
    city?: string;
    postalCode?: string;
}