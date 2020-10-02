$(document).ready(function(){

    // Declaring vars for
     let currentDayEl = $('#currentDay');
     let todaysDate = moment().format('MMMM Do YYYY, h:mm:ss a');
     todaysDate = todaysDate.split(',')
     todaysDate = `${moment().format('dddd')}, ${todaysDate[0]}`;

     





    
    //--------------------------Time obj-------------------------------
    const timeObj = {
        currentDay: todaysDate,
        time: moment().format('LT'),
        militaryTime: ''
    }

    


    // ---Converted data
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ---------------------------Function to take current time and convert to military time------------------------------------
    const convertToMilitaryTime = () => {

        // Declating a var for am or pm 
        let morningOrEvening = timeObj.time.slice(-2);
        // Declaring another var to store hour value and split the givin time by a colon :  
        let timeToConvert = timeObj.time.split(':')
        // Setting the timeToConvert to the first section of the split string. 
        timeToConvert = timeToConvert[0];
        // Once split store new value and turn into a number.
        timeToConvert = parseInt(timeToConvert);

        // Adding checks for if its am or pm 
        if (morningOrEvening === 'PM') {
            // if the time was pm and its the time is not 12(pm)                  //if time is 12(pm)
            timeToConvert !== 12 ? timeToConvert = (timeToConvert * 100) + 1200 : timeToConvert *= 100;
        // If time is AM
        } else {
            // If the time is 12(am)                  // if time is not 12(am)
            timeToConvert === 12 ? timeToConvert = 0: timeToConvert *= 100;
        }
        // Setting object militaryTime to newly converted time.
        return timeObj.militaryTime = timeToConvert;
    }
    // calling function to update timeObj
    convertToMilitaryTime()








    // -- DOM manipulation
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    currentDayEl.text(timeObj.currentDay);
    // ---------------------------------Loop through all rows and update DOM accordingly---------------------------------------
    $(".row").each(function() {

        // -----------------Creating vars for the elments requred update the DOM----------------------------
        // Div row containg all the hourly content and grabing its data-hour attribute
        let checkDataHour = $(this).attr('data-hour');
        // Div containg the textarea element
        let textAreaDivEl = $(this).children('div.textDiv');
        // The value of the textarea data-name attribute
        let textareaDataName = textAreaDivEl.children('textarea').attr('data-name');
        // turning value of the textarea data-name attr to a number to be compared to the converted time in timeObj
        checkDataHour = parseInt(checkDataHour);

        // ------------------Checking the time and comparing it to the html elements and adding classes-------------------------------
        //-------------------according to if they are in the past present or future.--------------------------------------------------
        if ( checkDataHour < timeObj.militaryTime ) {
            $(this).children('div .col-8').addClass('past');
        }
        if ( checkDataHour === timeObj.militaryTime ) {
            $(this).children('div.col-8').addClass('present');
        }
        if ( checkDataHour > timeObj.militaryTime ) {
            $(this).children('div.col-8').addClass('future');
        }

        // -------------------Checking if hourly log exists if it does update the corresponding---------------------------------- 
        //--------------------Html element with the value of that keys value.-----------------------------------------------------
        if(localStorage.getItem('hourlyLog') !== null) {
            // parsing localStorage obj to be manipulated.
            let hourlyLogObj = JSON.parse(localStorage.getItem('hourlyLog'));
            // If there is a corresponding value in the obj for the textarea update the elment 
            if ( hourlyLogObj.hasOwnProperty(textareaDataName) ) {
                // sets value of textarea to value stored in hourly-log local obj
                textAreaDivEl.children('textarea').val(hourlyLogObj[textareaDataName]);
            }
        }
    })





    // -- Creating and updating local storage Object
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //-----------------------------Saving Value of the new input to the textarea---------------------------------------
    $('.saveBtn').on('click', function(){
        //------------------- Declaring vars for target specific data-----------------------------------
        // Element of the this events prevouse sibling and that elements child thats a teaxtarea element
        let textAreaEl = $(this).prev().children('textarea');
        // Value of the textarea
        let textAreaElValue = textAreaEl.val();
        // Value of the textareas data-name attr
        let textareaDataName = textAreaEl.attr('data-name');

        //--------------------Check if Local Storage Object exists if not create it.-------------
        if (localStorage.getItem('hourlyLog') === null) { 
            localStorage.setItem('hourlyLog','{}'); 
        }

        //--------------------Updating Local Storage Object----------------------
        // Once object is created parse it and set to new var to so we can manipulate and add key value pairs
        let old_hourlyLog = JSON.parse(localStorage.getItem('hourlyLog'));
        // See if the obj hasOwnProperty of (textarea data-name attr) and if its  value is empty
        if ( old_hourlyLog.hasOwnProperty(textareaDataName)  === false && textAreaElValue === '') {
            // if there is no property and value is empty don't update and notify user.
            alert('Please fill out the text area.');
        } else {
            // if not then update property value or creat it.
            old_hourlyLog[textareaDataName] = textAreaElValue;
        }

        // -----------------------Updates Local Storage object with newly created data-------------------
        let new_houlyLog = JSON.stringify(old_hourlyLog);
        localStorage.setItem('hourlyLog',new_houlyLog);
    })



    
})