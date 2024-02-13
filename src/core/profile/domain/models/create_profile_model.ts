export class CreateProfileModel {
  name: string;
  surname: string;
  email: string;

  constructor(profile: { name: string; surname: string; email: string }) {
    this.name = profile.name;
    this.surname = profile.surname;
    this.email = profile.email;
  }
}
