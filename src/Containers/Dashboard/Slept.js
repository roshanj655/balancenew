import React, { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
import { userService } from '../../Services/UserService';
function Slept(props) {
    const url = "http://zavius.in/balance/assets/images/";
    var sleepTimeVar = 0;
    let data = [];
    useEffect(() => {
        updatesleptArray("day");
        settabslept("sleptDay");
    }, [props.newChange]);
    useEffect(() => {
        updatesleptArray("day");
        settabslept("sleptDay");
    }, [props.selectedDate]);
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [sleptArray, setsleptArray] = useState([]);
    const [sleeptime, sleeptimes] = useState(0);
    const [sleepData, setSleepData] = useState([]);
    const [saleepMonthData, setSleepMonthData] = useState(0);
    const updatesleptArray = (check) => {
        setSleepData([]);
        var date = new Date(props.selectedDate);

        // props.sleep.map((element, index) => {
        //     let day = new Date(element.day).getTime();
        //     let currentDate = date.getTime();
        if (check == "day") {
            userService.fetchSleeps({ 'date': props.selectedDate }).then((sleep) => {
                sleeptimes(sleep.length ? sleep[0].hours : 0)
            })
        }
        else if (check == "week") {
            userService.fetchSleepWeek({ 'date': props.selectedDate }).then((sleep) => {
                chartData(sleep)
            })
        }
        else if (check == "month") {
            setSleepMonthData(0);
            userService.fetchMonth({ 'date': props.selectedDate }).then((data) => {
                setSleepMonthData(data.sleepMonthStats);
                // setMoodData(0);
            })
        }
        // });
        // sleeptimes(sleepTimeVar);
    }

    function chartData(sleep) {
        sleep.map((element, index) => {
            let day = new Date(element.day);
            let obj = {
                name: day.getDate() + " " + month[day.getUTCMonth()],
                time: element.hours
            }
            data.push(obj);
        });
        setSleepData(data);
    }

    const [tabslept, settabslept] = useState("sleptDay");
    var sleepsTime = sleeptime.toString().split('.');
    return (
        <div className="slept">
            <h4>You Slept</h4>
            <ul className=" justify-content-end nav nav-tabs mb-3" id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <a
                        className={"nav-link " + ((tabslept == "sleptDay") ? "active" : "")}
                        id="ex1-tab-1"
                        data-mdb-toggle="tab"
                        role="tab"
                        aria-controls="ex1-tabs-1"
                        aria-selected="true"
                        onLoad={() => {
                            updatesleptArray("day")
                            settabslept("sleptDay")
                        }}
                        onClick={() => {
                            updatesleptArray("day")
                            settabslept("sleptDay")

                        }
                        }
                    >Day</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a
                        className={"nav-link " + ((tabslept == "sleptWeek") ? "active" : "")}
                        id="ex1-tab-2"
                        data-mdb-toggle="tab"
                        role="tab"
                        aria-controls="ex1-tabs-2"
                        aria-selected="false"
                        onClick={() => {
                            updatesleptArray("week")
                            settabslept("sleptWeek")
                        }}
                    >Week</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a
                        className={"nav-link " + ((tabslept == "sleptMonth") ? "active" : "")}
                        id="ex1-tab-3"
                        data-mdb-toggle="tab"
                        href="#ex1-tabs-3"
                        role="tab"
                        aria-controls="ex1-tabs-3"
                        aria-selected="false"
                        onClick={() => {
                            updatesleptArray("month")
                            settabslept("sleptMonth")
                        }}
                    >Month</a>
                </li>
            </ul>
            <div className="tab-content text-center h413" id="ex1-content">
                {sleeptime <= 0 ?
                    <div
                            
                    >
                       <img src={url+"notfound.png"} className="not-found-image"/>
                    </div>
                    :
                    (tabslept == "sleptDay") ?
                        <table className='table'>
                            <tr>
                                <td className='h371'>
                                    <div
                                        className="flexbox tab-pane fade show active">
                                        <h2 className="flex-item f40">{sleepsTime[0]} hours {sleepsTime[1] || 0}min
                                            <img src={url + "sleep.png"} className="sleep-icon" alt="image" />
                                        </h2>
                                        {/* <p className="add btn">+  Add Sleep</p> */}
                                    </div>
                                </td>
                            </tr>
                        </table>
                        : ""
                }
                {(tabslept == "sleptWeek") ?
                    <LineChart
                        width={385}
                        height={296}
                        data={sleepData}
                        margin={{
                            top: 5,
                            right: 0,
                            left: 0,
                            bottom: 5
                        }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="time"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                        />
                        <Line type="monotone" dataKey="Date" stroke="#82ca9d" />
                    </LineChart>
                    : ""}
                {tabslept == 'sleptMonth' ?
                    <div className="row h341 table-responsive">
                        <table className='table text-center'>
                            {!saleepMonthData ?
                                <tr><td colSpan="4">Hang tight, we are grabbing the data</td></tr>
                                :
                                <span>
                                    <td colSpan={4}><div class="flexbox tab-pane fade show active"><h2 class="flex-item">Average Sleep Last 30 Days</h2></div></td>

                                    <tr>
                                        <div
                                            className="flexbox tab-pane fade show active">
                                            <h2 className="flex-item f37">{saleepMonthData} hours per night
                                                <img src={url + "sleep.png"} className="sleep-icon" alt="image" /></h2>
                                            {/* <p className="add btn">+  Add Sleep</p> */}
                                        </div>
                                    </tr>
                                </span>
                            }
                        </table>

                    </div>
                    : ""}

                {/* <div className="tab-pane fade" id="ex1-tabs-2" role="tabpanel" aria-labelledby="ex1-tab-2">
                    7hr 
                </div>
                <div className="tab-pane fade" id="ex1-tabs-3" role="tabpanel" aria-labelledby="ex1-tab-3">
                    Tab 3 content
                </div> */}
            </div>
        </div>
    );
}

export default Slept;