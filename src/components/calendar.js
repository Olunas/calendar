import React, { Component } from "react";
import ReactDOM from "react-dom";
import '../styles/calendar.css';

function GetDays (props){
    return <div className={props.class} onClick={props.click} data-index={props.itemNum} style={props.style}>{props.day}</div>
}
function GetDay (props){
    return <div className="selectDay">{props.day}</div>
}
function GetMonth (props){
    return <div className="selectMonth">{props.month}</div>
}
function SelectOptions(props) {
    return <option selected={props.selected} value={props.value}>{props.value}</option>
}

class Calendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
          date : new Date()
        }
    }

    render() {
        let date = this.state.date;
        let currentDay = date.getDate();
        let currentMonth = date.getMonth();
        let currentYear = date.getFullYear();
        let weekday = new Date(currentYear , currentMonth , 1).getDay();
        if(weekday == 0){weekday=7;}
        const allMonth = [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь'
        ]
        const holidays = [
            new Date(currentYear, 0 , 1).getMonth() + '.' + new Date(currentYear, 0 , 1).getDate(),
            new Date(currentYear, 0 , 2).getMonth() + '.' + new Date(currentYear, 0 , 2).getDate(),
            new Date(currentYear, 0 , 3).getMonth() + '.' + new Date(currentYear, 0 , 3).getDate(),
            new Date(currentYear, 0 , 4).getMonth() + '.' + new Date(currentYear, 0 , 4).getDate(),
            new Date(currentYear, 0 , 5).getMonth() + '.' + new Date(currentYear, 0 , 5).getDate(),
            new Date(currentYear, 0 , 6).getMonth() + '.' + new Date(currentYear, 0 , 6).getDate(),
            new Date(currentYear, 0 , 7).getMonth() + '.' + new Date(currentYear, 0 , 7).getDate(),
            new Date(currentYear, 0 , 8).getMonth() + '.' + new Date(currentYear, 0 , 8).getDate(),
            new Date(currentYear, 1 , 23).getMonth() + '.' + new Date(currentYear, 1 , 23).getDate(),
            new Date(currentYear, 2 , 8).getMonth() + '.' + new Date(currentYear, 2 , 8).getDate(),
            new Date(currentYear, 4 , 1).getMonth() + '.' + new Date(currentYear, 4 , 1).getDate(),
            new Date(currentYear, 4 , 9).getMonth() + '.' + new Date(currentYear, 4 , 9).getDate(),
            new Date(currentYear, 5 , 12).getMonth() + '.' + new Date(currentYear, 5 , 12).getDate(),
            new Date(currentYear, 10 , 4).getMonth() + '.' + new Date(currentYear, 10 , 4).getDate(),
        ];
        if(currentMonth == 0 || currentMonth == 2 || currentMonth == 4 || currentMonth == 6 || currentMonth == 7 || currentMonth == 9 || currentMonth == 11){
            return <>
        	<div>
                <div className="selectDate">
                    <GetDay day={currentDay} />
                    <div className="selectMonthWrapper">
                    <div onClick={() => this.setState((currentMonth != 0)? { date : new Date(currentYear, currentMonth-1, currentDay) }:{ date : new Date(currentYear - 1, 11, currentDay) })} className="prevMonth"></div>
                    <GetMonth month={allMonth[currentMonth]} />
                    <div onClick={() => this.setState((currentMonth != 11)? { date : new Date(currentYear, currentMonth+1, currentDay) }:{ date : new Date(currentYear + 1, 0, currentDay) })} className="nextMonth"></div>
                    </div>
                    <select value={currentYear} className="selectYear" onChange={() => this.setState({ date : new Date(document.querySelector('#calendarForTrueTatarin select').value, currentMonth, currentDay)}) }>
                        {new Array(200).fill(0).map((item, index) => 
                        <SelectOptions key={index} value={(index+1900 == currentYear)? currentYear : index+1900} />)}
                    </select>
                </div>
                <div className="calendar">
                    <div>Пн</div>
                    <div>Вт</div>
                    <div>Ср</div>
                    <div>Чт</div>
                    <div>Пт</div>
                    <div>Сб</div>
                    <div>Вс</div>
                    {new Array(31).fill(0).map((item, index) => 
                    <GetDays
                        key={index} day={index+1} itemNum={index}
                        click={() => this.setState({ date : new Date(currentYear, currentMonth, index+1)})}
                        class="day"
                        style={{
                            color: (
                            (new Date(currentYear , currentMonth, index + 1).getDay() % 6 == 0) 
                            ||
                            (holidays.some((element) => element === new Date(currentYear , currentMonth, index + 1).getMonth() + '.' + new Date(currentYear , currentMonth, index + 1).getDate()))
                            ||
                            (holidays.some((element) => element === new Date(currentYear , currentMonth, index).getMonth() + '.' + new Date(currentYear , currentMonth, index).getDate()) && (new Date(currentYear , currentMonth, index).getDay() % 6 == 0))
                            ||
                            (holidays.some((element) => element === new Date(currentYear , currentMonth, index - 1).getMonth() + '.' + new Date(currentYear , currentMonth, index - 1).getDate()) && (new Date(currentYear , currentMonth, index).getDay() % 6 == 0))
                            )?'red' : 'initial',
                            backgroundColor: (new Date(currentYear , currentMonth, index + 1).getDate() == currentDay)? 'lightblue' : 'initial',
                            gridColumnStart: !index?weekday : {},
                        }}
                    ></GetDays>)}
                </div>
            </div>
            </>
        }
        else if(currentMonth == 1 && currentYear%4 == 0){
            return <>
            <div>
            <div className="selectDate">
                <GetDay day={currentDay} />
                <div className="selectMonthWrapper">
                    <div onClick={() => this.setState((currentMonth != 0)? { date : new Date(currentYear, currentMonth-1, currentDay) }:{ date : new Date(currentYear - 1, 11, currentDay) })} className="prevMonth"></div>
                    <GetMonth month={allMonth[currentMonth]} />
                    <div onClick={() => this.setState((currentMonth != 11)? { date : new Date(currentYear, currentMonth+1, currentDay) }:{ date : new Date(currentYear + 1, 0, currentDay) })} className="nextMonth"></div>
                </div>
                <select value={currentYear} className="selectYear" onChange={() => this.setState({ date : new Date(document.querySelector('#calendarForTrueTatarin select').value, currentMonth, currentDay)}) }>
                    {new Array(200).fill(0).map((item, index) => 
                    <SelectOptions key={index} value={(index+1900 == currentYear)? currentYear : index+1900} />)}
                </select>
            </div>
        	<div className="calendar">
                <div>Пн</div>
                <div>Вт</div>
                <div>Ср</div>
                <div>Чт</div>
                <div>Пт</div>
                <div>Сб</div>
                <div>Вс</div>
                {new Array(29).fill(0).map((item, index) => 
                <GetDays
                    key={index} day={index+1} itemNum={index}
                    click={() => this.setState({ date : new Date(currentYear, currentMonth, index+1)})}
                    class="day"
                    style={{
                        color: (
                            (new Date(currentYear , currentMonth, index + 1).getDay() % 6 == 0) 
                            ||
                            (holidays.some((element) => element === new Date(currentYear , currentMonth, index + 1).getMonth() + '.' + new Date(currentYear , currentMonth, index + 1).getDate()))
                            ||
                            (holidays.some((element) => element === new Date(currentYear , currentMonth, index).getMonth() + '.' + new Date(currentYear , currentMonth, index).getDate()) && (new Date(currentYear , currentMonth, index).getDay() % 6 == 0))
                            ||
                            (holidays.some((element) => element === new Date(currentYear , currentMonth, index - 1).getMonth() + '.' + new Date(currentYear , currentMonth, index - 1).getDate()) && (new Date(currentYear , currentMonth, index).getDay() % 6 == 0))
                            )?'red' : 'initial',
                        backgroundColor: (new Date(currentYear , currentMonth, index + 1).getDate() == currentDay)? 'lightblue' : 'initial',
                        gridColumnStart: !index?weekday : {},
                    }}
                />)}
            </div>
            </div>
            </>
        }
        else if(currentMonth == 1 && currentYear%4 != 0){
            return <>
            <div>
            <div className="selectDate">
                <GetDay day={currentDay} />
                <div className="selectMonthWrapper">
                <div onClick={() => this.setState((currentMonth != 0)? { date : new Date(currentYear, currentMonth-1, currentDay) }:{ date : new Date(currentYear - 1, 11, currentDay) })} className="prevMonth"></div>
                    <GetMonth month={allMonth[currentMonth]} />
                    <div onClick={() => this.setState((currentMonth != 11)? { date : new Date(currentYear, currentMonth+1, currentDay) }:{ date : new Date(currentYear + 1, 0, currentDay) })} className="nextMonth"></div>
                </div>
                <select value={currentYear} className="selectYear" onChange={() => this.setState({ date : new Date(document.querySelector('#calendarForTrueTatarin select').value, currentMonth, currentDay)}) }>
                    {new Array(200).fill(0).map((item, index) => 
                    <SelectOptions key={index} value={(index+1900 == currentYear)? currentYear : index+1900} />)}
                </select>
            </div>
        	<div className="calendar">
                <div>Пн</div>
                <div>Вт</div>
                <div>Ср</div>
                <div>Чт</div>
                <div>Пт</div>
                <div>Сб</div>
                <div>Вс</div>
                {new Array(28).fill(0).map((item, index) => 
                <GetDays
                    key={index} day={index+1} itemNum={index}  
                    click={() => this.setState({ date : new Date(currentYear, currentMonth, index+1)})}
                    class="day"
                    style={{
                        color: (
                            (new Date(currentYear , currentMonth, index + 1).getDay() % 6 == 0) 
                            ||
                            (holidays.some((element) => element === new Date(currentYear , currentMonth, index + 1).getMonth() + '.' + new Date(currentYear , currentMonth, index + 1).getDate()))
                            ||
                            (holidays.some((element) => element === new Date(currentYear , currentMonth, index).getMonth() + '.' + new Date(currentYear , currentMonth, index).getDate()) && (new Date(currentYear , currentMonth, index).getDay() % 6 == 0))
                            ||
                            (holidays.some((element) => element === new Date(currentYear , currentMonth, index - 1).getMonth() + '.' + new Date(currentYear , currentMonth, index - 1).getDate()) && (new Date(currentYear , currentMonth, index).getDay() % 6 == 0))
                            )?'red' : 'initial',
                            backgroundColor: (new Date(currentYear , currentMonth, index + 1).getDate() == currentDay)? 'lightblue' : 'initial',
                            gridColumnStart: !index?weekday : {},
                    }}
                />)}
            </div>
            </div>
            </>
        }
        else{
            return <>
            <div>
            <div className="selectDate">
                <GetDay day={currentDay} />
                <div className="selectMonthWrapper">
                <div onClick={() => this.setState((currentMonth != 0)? { date : new Date(currentYear, currentMonth-1, currentDay) }:{ date : new Date(currentYear - 1, 11, currentDay) })} className="prevMonth"></div>
                    <GetMonth month={allMonth[currentMonth]} />
                    <div onClick={() => this.setState((currentMonth != 11)? { date : new Date(currentYear, currentMonth+1, currentDay) }:{ date : new Date(currentYear + 1, 0, currentDay) })} className="nextMonth"></div>
                </div>
                <select value={currentYear} className="selectYear" onChange={() => this.setState({ date : new Date(document.querySelector('#calendarForTrueTatarin select').value, currentMonth, currentDay)}) }>
                    {new Array(200).fill(0).map((item, index) => 
                    <SelectOptions key={index} value={(index+1900 == currentYear)? currentYear : index+1900} />)}
                </select>
            </div>
        	<div className="calendar">
                <div>Пн</div>
                <div>Вт</div>
                <div>Ср</div>
                <div>Чт</div>
                <div>Пт</div>
                <div>Сб</div>
                <div>Вс</div>
                {new Array(30).fill(0).map((item, index) => 
                <GetDays
                    key={index} day={index+1} itemNum={index}  
                    click={() => this.setState({ date : new Date(currentYear, currentMonth, index+1)})}
                    class="day"
                    style={{
                        color: (
                            (new Date(currentYear , currentMonth, index + 1).getDay() % 6 == 0) 
                            ||
                            (holidays.some((element) => element === new Date(currentYear , currentMonth, index + 1).getMonth() + '.' + new Date(currentYear , currentMonth, index + 1).getDate()))
                            ||
                            (holidays.some((element) => element === new Date(currentYear , currentMonth, index).getMonth() + '.' + new Date(currentYear , currentMonth, index).getDate()) && (new Date(currentYear , currentMonth, index).getDay() % 6 == 0))
                            ||
                            (holidays.some((element) => element === new Date(currentYear , currentMonth, index - 1).getMonth() + '.' + new Date(currentYear , currentMonth, index - 1).getDate()) && (new Date(currentYear , currentMonth, index).getDay() % 6 == 0))
                            )?'red' : 'initial',
                            backgroundColor: (new Date(currentYear , currentMonth, index + 1).getDate() == currentDay)? 'lightblue' : 'initial',
                            gridColumnStart: !index?weekday : {},
                    }}
                />)}
            </div>
            </div>
            </>
        }
    };
}



export default Calendar;