import React, { useState, useEffect } from 'react';
import { userService } from '../../Services/UserService';
import Popover, { PopoverMode, PopoverPlacement } from 'react-native-popover-view';
function Felt(props) {
    const url = "http://zavius.in/balance/assets/images/";
    const [showPopover, setShowPopover] = useState("");
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
    const [moodData, setMoodData] = useState(0);
    const getDayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let moodTime = [];
    const updateMoodArray = (check) => {
        var date = new Date(props.selectedDate);
        if (check == "day") {
            userService.fetchMoods({ 'date': props.selectedDate }).then((moods) => {
                setMoodArray(moods);

            })

        }
        else if (check == "week") {
            userService.fetchMoodWeekGraph({ 'date': props.selectedDate }).then((moods) => {
                setMoodArray(moods.moodWeekData);
            })
        }
        else if (check == "month") {
            setMoodData(1);
            userService.fetchMonth({ 'date': props.selectedDate }).then((moods) => {
                setMoodArray(moods.moodMonthStats);
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
        let margin = (10 - item.score) * 17;
        // if(day==6){
        return <td>
            <Popover
                isVisible={(showPopover == 'popover' + index) ? true : false}
                mode={PopoverMode.TOOLTIP}
                placement={PopoverPlacement.RIGHT}
                className="popdesc"
                from={(
                    <div className={"width70 activity-icon text-center margin-top-" + margin} ><img src={url + "Moods/" + (item.type == 'Goofy' ? 'silly' : item.type.toLowerCase()) + ".png"} alt="image" onMouseEnter={() => setShowPopover('popover' + index)} onMouseOut={() => setShowPopover("")} /></div>
                )}>
                <div className="card popovers">
                    <div className="card-header">
                        {item.type}
                    </div>
                    <div className="card-body">
                        <p className="card-text">{item.entry ? item.entry : "No Comment"}</p>
                    </div>
                </div>
            </Popover>

        </td>

    })
    let moods3 = moodArray.map((item, index) => {
        let day = new Date(item.day).getDate();
        let hours = new Date(item.day).getHours();
        var minutes = new Date(item.day).getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';

        return <td>{hours + ":" + (minutes < 10 ? 0 : '') + minutes + " " + ampm}</td>

    })
    let moods4 = moodArray.map((item, index) => {
        if (index < 4) {
            return <td>
                <Popover
                    isVisible={(showPopover == 'popover' + index) ? true : false}
                    mode={PopoverMode.TOOLTIP}
                    placement={PopoverPlacement.RIGHT}
                    className="popdesc"
                    from={(
                        <div className={"width70 activity-icon text-center margin-auto"} ><img src={url + "Moods/" + (item.type == 'Goofy' ? 'silly' : item.type.toLowerCase()) + ".png"} alt="image" onMouseEnter={() => setShowPopover('popover' + index)} onMouseOut={() => setShowPopover("")} /></div>
                    )}>
                    <div className="card popovers">
                        <div className="card-header">
                            {item.type}
                        </div>
                        <div className="card-body">
                            <p className="card-text">{item.entry ? item.entry : "No Comment"}</p>
                        </div>
                    </div>
                </Popover>
            </td>
        }
    })
    const [tabMood, settabMood] = useState("moodDay");
    return (
        <div className="slept">

            <h4>You Felt</h4>
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
                    className="tab-pane fade h413 show active"
                    id="ex1-tabs-1"
                    role="tabpanel"
                    aria-labelledby="ex1-tab-1">
                    {!moodArray.length ?
                        <div

                        >
                            <img src={url + "notfound.png"} className="not-found-image" />
                        </div>
                        : ""}
                    {tabMood == 'moodDay' ?
                        <div className="row h371 table-responsive w427">
                            <table className='table text-center'>
                                <tr className=' table-align-top'>
                                    {
                                        moods2
                                    }
                                </tr>
                                <tr className=' table-align-bottom'>
                                    {moods3}
                                </tr>
                            </table>

                        </div>

                        : ""}
                    {tabMood == 'moodWeek' ?
                        <div className="row h371 table-responsive">
                            <table className='text-center'>
                                <tr className='table-align-bottom'>
                                    <td>
                                        {moodArray.map((item, index) => {
                                            let day = new Date(item.day).getDay();

                                            if (getDayOfWeek[day] === 'Sun') {
                                                return <Popover
                                                    isVisible={(showPopover == 'popover' + index) ? true : false}
                                                    mode={PopoverMode.TOOLTIP}
                                                    placement={PopoverPlacement.RIGHT}
                                                    className="popdesc"
                                                    from={(
                                                        <div className={"width70 activity-icon text-center"} ><img src={url + "Moods/" + (item.type == 'Goofy' ? 'silly' : item.type.toLowerCase()) + ".png"} alt="image" onMouseEnter={() => setShowPopover('popover' + index)} onMouseOut={() => setShowPopover("")} /></div>
                                                    )}>
                                                    <div className="card popovers">
                                                        <div className="card-header">
                                                            {item.type}
                                                        </div>
                                                        <div className="card-body">
                                                            <p className="card-text">{item.entry ? item.entry : "No Comment"}</p>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }


                                        })}
                                    </td>
                                    <td>
                                        {moodArray.map((item, index) => {
                                            let day = new Date(item.day).getDay();

                                            if (getDayOfWeek[day] === 'Mon') {
                                                return <Popover
                                                    isVisible={(showPopover == 'popover' + index) ? true : false}
                                                    mode={PopoverMode.TOOLTIP}
                                                    placement={PopoverPlacement.RIGHT}
                                                    className="popdesc"
                                                    from={(
                                                        <div className={"width70 activity-icon text-center"} ><img src={url + "Moods/" + (item.type == 'Goofy' ? 'silly' : item.type.toLowerCase()) + ".png"} alt="image" onMouseEnter={() => setShowPopover('popover' + index)} onMouseOut={() => setShowPopover("")} /></div>
                                                    )}>
                                                    <div className="card popovers">
                                                        <div className="card-header">
                                                            {item.type}
                                                        </div>
                                                        <div className="card-body">
                                                            <p className="card-text">{item.entry ? item.entry : "No Comment"}</p>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }


                                        })}
                                    </td>
                                    <td>
                                        {moodArray.map((item, index) => {
                                            let day = new Date(item.day).getDay();

                                            if (getDayOfWeek[day] === 'Tue') {
                                                return <Popover
                                                    isVisible={(showPopover == 'popover' + index) ? true : false}
                                                    mode={PopoverMode.TOOLTIP}
                                                    placement={PopoverPlacement.RIGHT}
                                                    className="popdesc"
                                                    from={(
                                                        <div className={"width70 activity-icon text-center"} ><img src={url + "Moods/" + (item.type == 'Goofy' ? 'silly' : item.type.toLowerCase()) + ".png"} alt="image" onMouseEnter={() => setShowPopover('popover' + index)} onMouseOut={() => setShowPopover("")} /></div>
                                                    )}>
                                                    <div className="card popovers">
                                                        <div className="card-header">
                                                            {item.type}
                                                        </div>
                                                        <div className="card-body">
                                                            <p className="card-text">{item.entry ? item.entry : "No Comment"}</p>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }


                                        })}
                                    </td>
                                    <td>
                                        {moodArray.map((item, index) => {
                                            let day = new Date(item.day).getDay();

                                            if (getDayOfWeek[day] === 'Wed') {
                                                return <Popover
                                                    isVisible={(showPopover == 'popover' + index) ? true : false}
                                                    mode={PopoverMode.TOOLTIP}
                                                    placement={PopoverPlacement.RIGHT}
                                                    className="popdesc"
                                                    from={(
                                                        <div className={"width70 activity-icon text-center"} ><img src={url + "Moods/" + (item.type == 'Goofy' ? 'silly' : item.type.toLowerCase()) + ".png"} alt="image" onMouseEnter={() => setShowPopover('popover' + index)} onMouseOut={() => setShowPopover("")} /></div>
                                                    )}>
                                                    <div className="card popovers">
                                                        <div className="card-header">
                                                            {item.type}
                                                        </div>
                                                        <div className="card-body">
                                                            <p className="card-text">{item.entry ? item.entry : "No Comment"}</p>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }


                                        })}
                                    </td>
                                    <td>
                                        {moodArray.map((item, index) => {
                                            let day = new Date(item.day).getDay();
                                            { { getDayOfWeek[day] } }
                                            if (getDayOfWeek[day] === 'Thu') {
                                                return <Popover
                                                    isVisible={(showPopover == 'popover' + index) ? true : false}
                                                    mode={PopoverMode.TOOLTIP}
                                                    placement={PopoverPlacement.RIGHT}
                                                    className="popdesc"
                                                    from={(
                                                        <div className={"width70 activity-icon text-center"} ><img src={url + "Moods/" + (item.type == 'Goofy' ? 'silly' : item.type.toLowerCase()) + ".png"} alt="image" onMouseEnter={() => setShowPopover('popover' + index)} onMouseOut={() => setShowPopover("")} /></div>
                                                    )}>
                                                    <div className="card popovers">
                                                        <div className="card-header">
                                                            {item.type}
                                                        </div>
                                                        <div className="card-body">
                                                            <p className="card-text">{item.entry ? item.entry : "No Comment"}</p>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }


                                        })}
                                    </td>
                                    <td>
                                        {moodArray.map((item, index) => {
                                            let day = new Date(item.day).getDay();

                                            if (getDayOfWeek[day] === 'Fri') {
                                                return <Popover
                                                    isVisible={(showPopover == 'popover' + index) ? true : false}
                                                    mode={PopoverMode.TOOLTIP}
                                                    placement={PopoverPlacement.RIGHT}
                                                    className="popdesc"
                                                    from={(
                                                        <div className={"width70 activity-icon text-center"} ><img src={url + "Moods/" + (item.type == 'Goofy' ? 'silly' : item.type.toLowerCase()) + ".png"} alt="image" onMouseEnter={() => setShowPopover('popover' + index)} onMouseOut={() => setShowPopover("")} /></div>
                                                    )}>
                                                    <div className="card popovers">
                                                        <div className="card-header">
                                                            {item.type}
                                                        </div>
                                                        <div className="card-body">
                                                            <p className="card-text">{item.entry ? item.entry : "No Comment"}</p>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }


                                        })}
                                    </td>
                                    <td>
                                        {moodArray.map((item, index) => {
                                            let day = new Date(item.day).getDay();

                                            if (getDayOfWeek[day] === 'Sat') {
                                                return <Popover
                                                    isVisible={(showPopover == 'popover' + index) ? true : false}
                                                    mode={PopoverMode.TOOLTIP}
                                                    placement={PopoverPlacement.RIGHT}
                                                    className="popdesc"
                                                    from={(
                                                        <div className={"width70 activity-icon text-center"} ><img src={url + "Moods/" + (item.type == 'Goofy' ? 'silly' : item.type.toLowerCase()) + ".png"} alt="image" onMouseEnter={() => setShowPopover('popover' + index)} onMouseOut={() => setShowPopover("")} /></div>
                                                    )}>
                                                    <div className="card popovers">
                                                        <div className="card-header">
                                                            {item.type}
                                                        </div>
                                                        <div className="card-body">
                                                            <p className="card-text">{item.entry ? item.entry : "No Comment"}</p>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            }


                                        })}
                                    </td>
                                </tr>
                                <tr className='sticlytr'>
                                    {moods7}
                                </tr>
                            </table>

                        </div>
                        : ""}
                    {tabMood == 'moodMonth' ?
                        <div className="row h371 table-responsive">
                            <table className='table text-center'>

                                {moodData ?
                                    <tr><td colSpan="4">Hang tight, we are grabbing the data</td></tr>


                                    :
                                    <span>
                                        <tr><td colSpan={4}><div className="flexbox tab-pane fade show active"><h2 className="flex-item">Top Moods Last 30 Days</h2></div></td></tr>

                                        <tr>

                                            {
                                                moods4
                                            }
                                        </tr>
                                    </span>
                                }
                            </table>

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

export default Felt;