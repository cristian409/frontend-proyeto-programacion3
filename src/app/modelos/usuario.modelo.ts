export class usuarioModelo {
    id?: String;
    nombre?: String;
    apellidoss?: String;
    documento?: Number;
    email?: String;
    contraseña?: String;
    id_ciudad?: Number;
    rolId?: String;
    user?: usuarioModelo;
    token?: String;
    isLoggedIn: boolean = false;
}