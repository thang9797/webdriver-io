import homePage from "../pageObjects/homePage";
// import AllureReporter from "@wdio/allure-reporter";
describe('Flight Booking', () => {
  before(async () => {
      // Open url
      homePage.openUrl();
      await expect(browser).toHaveTitle('Đặt vé máy bay, tour du lịch, khách sạn giá rẻ nhất - BestPrice');
      // close popup
      // await homePage.closePopUp();
  });   
  it('Select departure and return place', async() => {
    const HANOI = 'Hà Nội (HAN)';
    const HOCHIMINH = 'Hồ Chí Minh (SGN)';
    // Input departure place 
    await homePage.inputDeparturePlace('han');
    await homePage.clickToCodePlace("HAN");
    await expect(homePage.fromPlace).toHaveAttribute('value',HANOI);

    // Input return place
    await homePage.inputDestinationPlace('Ho chi minh');
    await homePage.clickToCodePlace("SGN");
    await expect(homePage.desPlace).toHaveAttribute('value',HOCHIMINH);

    // Select Departure Date 
    let dateA =  homePage.getDepartureDateFlight();
    await homePage.clickDepartureDate();
    await homePage.selectDate(dateA);
    // Select Return Date 
    let dateB =  homePage.getReturnDateFlight();
    await homePage.clickReturnDate();
    await homePage.selectDate(dateB);
    // Add Passenger
    await homePage.clickPassenger();
    await expect(homePage.countOfChildren).toHaveAttribute('value','1');

    // Click to Find Flight button
    await homePage.clickToFindFlight();
    await homePage.resultFindFlight.waitForExist();
  });   
});
