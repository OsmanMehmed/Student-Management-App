

export class Alumn{

  private _id: string;
  private _name: string;
  private _middleName: string;
  private _email: string;
  private _userID: string;
  private _phone: string;
  private _country: string;
  private _province: string;
  private _postalCode: string;
  private _location: string;
  private _nickName: string;
  private _password: string;
  private _otherPhone?: string | undefined;
  private _lastName?: string | undefined;



  constructor(name: string, middleName: string, email: string, userID: string,
              phone: string, country: string, province: string, postalCode: string,
              location: string, nickName: string, password: string, otherPhone?: string,
              lastName?: string){

    this._id = Math.random().toString(36).substring(2, 9);
    this._name = name;
    this._middleName = middleName;
    this._email = email;
    this._userID = userID;
    this._phone = phone;
    this._country = country;
    this._province = province;
    this._postalCode = postalCode;
    this._location = location;
    this._nickName = nickName;
    this._password = password;
    this._otherPhone = otherPhone;
    this._lastName = lastName;
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  public get middleName(): string {
    return this._middleName;
  }
  public set middleName(value: string) {
    this._middleName = value;
  }
  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }
  public get userID(): string {
    return this._userID;
  }
  public set userID(value: string) {
    this._userID = value;
  }
  public get phone(): string {
    return this._phone;
  }
  public set phone(value: string) {
    this._phone = value;
  }
  public get country(): string {
    return this._country;
  }
  public set country(value: string) {
    this._country = value;
  }
  public get province(): string {
    return this._province;
  }
  public set province(value: string) {
    this._province = value;
  }
  public get postalCode(): string {
    return this._postalCode;
  }
  public set postalCode(value: string) {
    this._postalCode = value;
  }
  public get location(): string {
    return this._location;
  }
  public set location(value: string) {
    this._location = value;
  }
  public get nickName(): string {
    return this._nickName;
  }
  public set nickName(value: string) {
    this._nickName = value;
  }
  public get password(): string {
    return this._password;
  }
  public set password(value: string) {
    this._password = value;
  }
  public get otherPhone(): string | undefined {
    return this._otherPhone;
  }
  public set otherPhone(value: string | undefined) {
    this._otherPhone = value;
  }
  public get lastName(): string | undefined {
    return this._lastName;
  }
  public set lastName(value: string | undefined) {
    this._lastName = value;
  }

}
