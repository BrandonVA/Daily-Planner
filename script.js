$(document).ready(function(){

    console.log('hello world');

    //let time = moment().format('LT');
     let todaysDate = moment().format('MMMM Do YYYY, h:mm:ss a');
     todaysDate = todaysDate.split(',')
     todaysDate = `${moment().format('dddd')}, ${todaysDate[0]}`;


    // // messing around with selectors 
    // let testDataHour = $('div[data-hour]').children('div.col-8');
    // console.log(testDataHour);
    // testDataHour.addClass('present');


    
//--------------------------Time obj-------------------------------
    const timeObj = {
        currentDay: todaysDate,
        time: moment().format('LT'),
        militaryTime: ''
    }

    // converting time to be used in military time for an easy check and update with html div elements with the data-hour atrribute.
    const convertToMilitaryTime = () => {

        // Declating a var for am or pm 
        let morningOrEvening = timeObj.time.slice(-2);
        // Declaring another var to store hour value and split the givin time by a colon :  
        let timeToConvert = timeObj.time.split(':')
        // Setting the timeToConvert to the first section of the split string. 
        timeToConvert = timeToConvert[0];
        // Once split store new value and turn into a number.
        timeToConvert = parseInt(timeToConvert);

        ///////////////////////////////////////////checking logic
        // morningOrEvening = 'PM';
        // timeToConvert = 2;
        console.log(timeToConvert);


        // Adding checks for if its am or pm 
        if (morningOrEvening === 'PM') {
            // if the time was pm and its the time is not 12(pm)
            timeToConvert !== 12 ? timeToConvert = (timeToConvert * 100) + 1200 : timeToConvert *= 100;

            
        } else {
            // if the time is 12(am)
            timeToConvert === 12 ? timeToConvert = 0: timeToConvert *= 100;
            
        }
        
        return timeObj.militaryTime = timeToConvert;
    }

    convertToMilitaryTime()


    $(".row").each(function() {
        let checkDataHour = $(this).attr('data-hour');
        checkDataHour = parseInt(checkDataHour);
        console.log(checkDataHour);
        console.log('----------');
        console.log(timeObj.militaryTime);
        if ( checkDataHour < timeObj.militaryTime ) {
            $(this).children('div .col-8').addClass('past');
        }
        if ( checkDataHour === timeObj.militaryTime ) {
            $(this).children('div.col-8').addClass('present');
        }
        if ( checkDataHour > timeObj.militaryTime ) {
            $(this).children('div.col-8').addClass('future');
        }
    })
    console.log(timeObj.militaryTime);


   


    // console.log(timeObj.time);
    // console.log(timeObj.time.length);
    // console.log(morningOrEvening);
    // console.log(timeObj.currentDay);

    //-----------------------------UPDATING DOM---------------------------------------
    let currentDayEl = $('#currentDay');



    currentDayEl.text(timeObj.currentDay);

    $('.saveBtn').on('click', function(){
        let textAreaEl = $(this).prev().children('textarea');
        let textAreaElValue = textAreaEl.val();
        console.log(textAreaElValue);
        thisLocalStorageEl = textAreaEl.attr('data-name');
        console.log(thisLocalStorageEl);



        if (localStorage.getItem(thisLocalStorageEl) === null) {
            if (textAreaElValue === undefined) {
                textAreaElValue = 'Hello World'
            }
            localStorage.setItem('thisLocalStorageEl',textAreaElValue);
        let newElement = localStorage.getItem(thisLocalStorageEl) ;
        console.log(newElement);
        newElement = 'Hello world'
        textAreaEl.value = localStorage.getItem(textAreaEl)
        }


        // first add a check to see if value( textarea.val() ) was filled out if not than ask to fill it out 


        // need to creat an object for local storage 
        // once created when clicked see if obj hasOwnProperty of textarea data-name attr 
        // if fasle add it
        // if not than update property value






    })

    
})