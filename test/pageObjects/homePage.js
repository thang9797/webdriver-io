import BasePage  from "./BasePage";
const CLOSE_POPUP  = "//button[contains(@class,'fancybox-close')]/span";
const DEP_DATE     = '//input[@id="departure_date_flight"]';
const RETURN_DATE  = '//input[@id="returning_date_flight"]';
const PASSENGER    =  "//form[@id='flight_search_form']//input[@id='flight_passenger']";
const CHILDREN_PLUS_BUTTON   =   "//label[@class='control-label'][contains(text(),'Trẻ em')]/ancestor::div[@class='popover-content']//div[@class='row'][2]//span[@class='input-group-btn'][2]";
const FIND_BUTTON  =  "//div[@class='search-form__content__button']//button[@id='search_button']";
const CHD          =  "(//input[@name='CHD'])[1]";

class HomePage {
    get fromPlace(){
        return $('//label[text()="Điểm đi"]/following-sibling::input');
    }
    get desPlace(){
        return $('//label[text()="Điểm đến"]/following-sibling::input');
    }
    get inputCityA(){
        return $('//div[text()="Chọn điểm đi"]/parent::div//input[@placeholder="Mã sân bay, Tên sân bay, Tên thành phố..."]');
    }
    get inputCityB(){
        return $('//div[text()="Chọn điểm đến"]/parent::div//input[@placeholder="Mã sân bay, Tên sân bay, Tên thành phố..."]');
    }
    get resultFindFlight(){
        return $("//button[@id='filter_by_departure_depart']");
    }

    async inputDeparturePlace(value){
        await this.fromPlace.click();
        await this.inputCityA.click();
        await this.inputCityA.setValue(value);
    }
    async inputDestinationPlace(value){
        await this.desPlace.click();
        await this.inputCityB.click();
        await this.inputCityB.setValue(value);
    }

    async clickToCodePlace(code){
        let orignal = "//strong[text()='****']";
        let loc_code = orignal.replace("****" , code);
        await $(loc_code).click();
    }
    async openUrl() {
        await browser.maximizeWindow();
        await browser.url("https://www.bestprice.vn/");
    }

    async closePopUp(){
        await $(CLOSE_POPUP).waitForExist({timeout:25000});
        await $(CLOSE_POPUP).click();
        expect(await $(CLOSE_POPUP)).not.toBeDisplayed();
    }
    async clickDepartureDate() {
        await $(DEP_DATE).click();
    }
    async clickReturnDate() {
        await $(RETURN_DATE).click();
    }
    addDays(date, days) {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() + days);
        return newDate;
    }
    getDepartureDateFlight(){
        const todayDate = new Date();
        const days = 2;
        // Function call to add days
        var DateA = this.addDays(todayDate, days).getDate().toString();
        console.log(DateA);
        return DateA;
    }
    getReturnDateFlight(){
        const todayDate = new Date();
        const days = 5;
        // Function call to add days
        const DateB = this.addDays(todayDate, days).getDate().toString();
        console.log(DateB);
        return DateB;
    }
    async selectDate(datePara){
        // let SELECT_DATE  = "//span[text()='Hôm nay']//ancestor::tbody//tr//span[contains(@class,'ui-datepicker-day') and text()='****']";
        const todayDate = new Date().getDate();
        var SELECT_DATE = "//span[contains(@class,'ui-datepicker-day') and text()='@@@@']//ancestor::tbody//tr/td[@data-handler='selectDay']//span[contains(@class,'ui-datepicker-day') and text()='****']";
        var SELECT_DATE = SELECT_DATE.replace("****", datePara);
        var date = SELECT_DATE.replace("@@@@",todayDate);
        console.log(date);
        await $(date).waitForClickable({ timeout: 5000 });
        await $(date).click();
    }
    async clickPassenger() {
        await $(PASSENGER).click();
        await $(CHILDREN_PLUS_BUTTON).waitForClickable();
        await $(CHILDREN_PLUS_BUTTON).click();
    }
    get countOfChildren() {
        return $(CHD);
    }
    async clickToFindFlight() {
        await $(FIND_BUTTON).click();
    }
}

export default new HomePage();