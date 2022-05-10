class Convert {
  constructor(milliseconds) {
    this.milliseconds = milliseconds;
    this.conversionToMinutes = 60000;
    this.conversionToHours = 60 * this.conversionToMinutes;
    this.conversionToDay = 24 * this.conversionToHours;
  }

  toMinutes() {
    return this.milliseconds / this.conversionToMinutes;
  }
  toHours() {
    return this.milliseconds / this.conversionToHours;
  }
  toDays() {
    return this.milliseconds / this.conversionToDay;
  }
}
export default Convert
