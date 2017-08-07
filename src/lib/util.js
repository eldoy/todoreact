export default class Util {

  // Format date
  static string(date) {
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      , day = date.getDay()
      , dat = date.getDate()
      , month = date.getMonth() + 1
      , year = date.getFullYear();

    return `${days[day]} ${dat}-${month}-${year}`;
  }

  // Fake id for testing
  static fakeId() {
    return (Math.random() * 10);
  }
}
