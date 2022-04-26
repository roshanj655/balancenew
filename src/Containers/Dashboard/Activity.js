import React, { useState, useEffect } from 'react';
import { userService } from '../../Services/UserService';
function Activity(props) {
    const url = "http://zavius.in/balance/assets/images/";
    // props.moods.sort((a, b) => (a.score < b.score ? 1 : -1));
    let moodsArray = [];
    useEffect(() => {
        updateMoodArray("day");
        settabMood("moodDay");
    }, [props.newChange]);
    useEffect(() => {
        updateMoodArray("day");
        settabMood("moodDay");
    }, [props.selectedDate]);
    const [moodArray, setMoodArray] = useState([]);
    const [moodData, setMoodData] = useState([]);
    const getDayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let moodTime = [];
    const updateMoodArray = (check) => {
        var date = new Date(props.selectedDate);
        if (check == "day") {
            userService.fetchActivities({ 'date': props.selectedDate }).then((moods) => {
                setMoodArray(moods);
               
            })

        }
        else if (check == "week") {
            userService.fetchActivityWeekGraph({ 'date': props.selectedDate }).then((moods) => {
                setMoodArray(moods.activityWeekData);
            })
        }
        else if (check == "month") {
            setMoodData(1);
            userService.fetchMonth({ 'date': props.selectedDate }).then((moods) => {
                setMoodArray(moods.activityMonthStats);
                setMoodData(0);
            })
        }

    }


    let moods7 = getDayOfWeek.map((item, index) => {

        return <td>{item}</td>

    })
    let moods2 = moodArray.map((item, index) => {
        let day = new Date(item.day).getDate();
        let hours = new Date(item.day).getHours();
        // if(day==6){
            return <td><div className=" activity-icon text-center"><img src={url + "Activities/" + (item.type == 'Goofy' ? 'silly' : item.type.toLowerCase()) + ".png"} alt="image" /><p className='m0'>{item.duration} mins</p><p className='m0'>{item.type}</p></div></td>
        
    })
    let moods3 = moodArray.map((item, index) => {
            let day = new Date(item.day).getDate();
            let hours = new Date(item.day).getHours();
            var minutes = new Date(item.day).getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';

            return <td>{hours + ":" + (minutes<10?0:'')+minutes + " " + ampm}</td>

    })
    let moods4 = moodArray.map((item, index) => {
        if(index<4){
            return <td valign='top'><div className=" activity-icon text-center"><img src={url + "Activities/" + (item.type == 'Goofy' ? 'silly' : item.type.toLowerCase()) + ".png"} alt="image" /></div><div>{item.type}</div></td>
        }
        
    })
    const [tabMood, settabMood] = useState("moodDay");
    return (
        <div className="slept">
            <h4>Your Activities</h4>
            <ul className=" justify-content-end nav nav-tabs mb-3" id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <a
                        className={"nav-link " + ((tabMood == "moodDay") ? "active" : "")}
                        id="ex1-tab-1"
                        data-mdb-toggle="tab"
                        role="tab"
                        aria-controls="ex1-tabs-1"
                        aria-selected="true"
                        onLoad={() => {
                            updateMoodArray("day")
                            settabMood("moodDay")
                        }}
                        onClick={() => {
                            updateMoodArray("day")
                            settabMood("moodDay")

                        }
                        }
                    >Day</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a
                        className={"nav-link " + ((tabMood == "moodWeek") ? "active" : "")}
                        id="ex1-tab-2"
                        data-mdb-toggle="tab"
                        role="tab"
                        aria-controls="ex1-tabs-2"
                        aria-selected="false"
                        onClick={() => {
                            updateMoodArray("week")
                            settabMood("moodWeek")
                        }}
                    >Week</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a
                        className={"nav-link " + ((tabMood == "moodMonth") ? "active" : "")}
                        id="ex1-tab-3"
                        data-mdb-toggle="tab"
                        href="#ex1-tabs-3"
                        role="tab"
                        aria-controls="ex1-tabs-3"
                        aria-selected="false"
                        onClick={() => {
                            updateMoodArray("month")
                            settabMood("moodMonth")
                        }}
                    >Month</a>
                </li>
            </ul>
            <div className="tab-content" id="ex1-content">

                <div
                    className="tab-pane fade show active"
                    id="ex1-tabs-1"
                    role="tabpanel"
                    aria-labelledby="ex1-tab-1">
                    {!moodArray.length ?
                        <div
                            className="alert alert-danger"
                        >
                            No data found for this date
                            {/* <p className="add btn">+  Add Sleep</p> */}
                        </div>
                        : ""}
                    {tabMood == 'moodDay' ?
                    <div className="row h341 table-responsive">
                        <table className='table text-center'>
                            <tr>
                            {
                                moods2
                            }
                            </tr>
                            <tr>
                            { moods3}
                        </tr>
                        </table>
                        
                        </div>
                       
                        : ""}
                    {tabMood == 'moodWeek' ?
                        <div className="row h341 table-responsive">
                            <table>
                                <tr class="table-align-bottom">
                                    <td>
                                        {moodArray.map((item, index) => {
                                            let day = new Date(item.day).getDay();

                                            if (getDayOfWeek[day] === 'Sun') {
                                                return <div className="icon-box activity-icon text-center"><img src={url + "Activities/" + (item.type == 'Goofy' ? 'silly' : item.type.toLowerCase()) + ".png"} alt="image" /></div>
                                            }


                                        })}
                                    </td>
                                    <td>
                                        {moodArray.map((item, index) => {
                                            let day = new Date(item.day).getDay();

                                            if (getDayOfWeek[day] === 'Mon') {
                                                return <div className="icon-box activity-icon text-center"><img src={url + "Activities/" + (item.type == 'Goofy' ? 'silly' : item.type.toLowerCase()) + ".png"} alt="image" /></div>
                                            }


                                        })}
                                    </td>
                                    <td>
                                        {moodArray.map((item, index) => {
                                            let day = new Date(item.day).getDay();

                                            if (getDayOfWeek[day] === 'Tue') {
                                                return <div className="icon-box activity-icon text-center"><img src={url + "Activities/" + (item.type == 'Goofy' ? 'silly' : item.type.toLowerCase()) + ".png"} alt="image" /></div>
                                            }


                                        })}
                                    </td>
                                    <td>
                                        {moodArray.map((item, index) => {
                                            let day = new Date(item.day).getDay();

                                            if (getDayOfWeek[day] === 'Wed') {
                                                return <div className="icon-box activity-icon text-center"><img src={url + "Activities/" + (item.type == 'Goofy' ? 'silly' : item.type.toLowerCase()) + ".png"} alt="image" /></div>
                                            }


                                        })}
                                    </td>
                                    <td>
                                        {moodArray.map((item, index) => {
                                            let day = new Date(item.day).getDay();
                                            { { getDayOfWeek[day] } }
                                            if (getDayOfWeek[day] === 'Thu') {
                                                return <div className="icon-box activity-icon text-center"><img src={url + "Activities/" + (item.type == 'Goofy' ? 'silly' : item.type.toLowerCase()) + ".png"} alt="image" /></div>
                                            }


                                        })}
                                    </td>
                                    <td>
                                        {moodArray.map((item, index) => {
                                            let day = new Date(item.day).getDay();

                                            if (getDayOfWeek[day] === 'Fri') {
                                                return <div className="icon-box activity-icon text-center"><img src={url + "Activities/" + (item.type == 'Goofy' ? 'silly' : item.type.toLowerCase()) + ".png"} alt="image" /></div>
                                            }


                                        })}
                                    </td>
                                    <td>
                                        {moodArray.map((item, index) => {
                                            let day = new Date(item.day).getDay();

                                            if (getDayOfWeek[day] === 'Sat') {
                                                return <div className="icon-box activity-icon text-center"><img src={url + "Activities/" + (item.type == 'Goofy' ? 'silly' : item.type.toLowerCase()) + ".png"} alt="image" /></div>
                                            }


                                        })}
                                    </td>
                                </tr>
                            </table>

                        </div>
                        : ""}
                    {tabMood == 'moodMonth' ?
                            <div className="row h341 table-responsive">
                            <table className='table text-center'>
                                
                                {moodData?
                                <tr><td colSpan="99">Hang tight, we are grabbing the data</td></tr>
                                
                                
                                :
                                <span>
                                    <tr> <td colSpan={4}><div class="flexbox tab-pane fade show active"><h2 class="flex-item">Top Activities Last 30 Days</h2></div></td></tr>
                                    
                                <tr>
                                {
                                    moods4
                                }
                                </tr>
                                </span>
                                }
                            </table>
                            
                            </div>
                        :""}

                    {moodArray.length ?
                        <div className=" table-responsive">
                            
                            {tabMood == 'moodWeek' ?
                                <table className='table'>
                                    <tr>
                                        {moods7}
                                    </tr>
                                </table>
                                : ""}

                            {/* <div className="col-md-3 text-center time-slider-text">10:00 am</div>
                            <div className="col-md-3 text-center time-slider-text">12:00 am</div>
                            <div className="col-md-3 text-center time-slider-text">2:00 pm</div> */}
                        </div>
                        : ""}
                </div>

            </div>
            {/* <div className="tab-pane fade" id="ex1-tabs-2" role="tabpanel" aria-labelledby="ex1-tab-2">
                7hr
            </div>
            <div className="tab-pane fade" id="ex1-tabs-3" role="tabpanel" aria-labelledby="ex1-tab-3">
                Tab 3 content
            </div> */}
        </div>
    );

}

export default Activity;