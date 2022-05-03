import React, { useState, useEffect } from 'react';
import { RadialBarChart, RadialBar, Legend } from 'recharts';
import { userService } from '../../Services/UserService';
function Rightpanel(props) {
    const url = "http://zavius.in/balance/assets/images/";
    let data = [];
    let journalData = [];
    let cDatas = [];
    let journalArray = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
    // const myTimeout = setTimeout(function () {
    const [journal, setJournal] = useState([]);
    const [chartData, setChartData] = useState(JSON.parse('{"labels":["Activity","Mood","Sleep"],"data":[0,0,0]}'));
    useEffect(() => {
        userService.fetchMoodWeekGraph({ 'date': props.newDate }).then((data) => {
            let moods = data.moodWeekData;
            moods.map((item, index) => {
                item['title'] = "Mood";
                item['description'] = "You felt " + item.type;
                item['imagepath'] = url + "Moods/" + (item.type == 'Goofy' ? 'silly' : item.type.toLowerCase()) + ".png";
                journalData.push(item);
            });
            userService.fetchActivityWeekGraph({ 'date': props.newDate }).then((data) => {
                let activity = data.activityWeekData;
                activity.map((item, index) => {
                    item['title'] = "Activity";
                    item['description'] = "You play " + item.type + " for " + item.duration + " min";
                    item['imagepath'] = url + "Activities/" + (item.type == 'Goofy' ? 'silly' : item.type.toLowerCase()) + ".png";
                    journalData.push(item);
                });
                
                setJournal(journalData);
             })
        })

        userService.fetchMoodScores({ 'date': props.newDate }).then((data) => {
            cDatas[0] = data;
            userService.fetchSleepScores({ 'date': props.newDate }).then((data) => {
                cDatas[1] = data;
                userService.fetchActivityScores({ 'date': props.newDate }).then((data) => {
                    cDatas[2] = data;
                    setChartData(userService.fetchTriangle(cDatas[0], cDatas[1], cDatas[2]));
                })
            })

        })
    }, [props.newDate]);

    journal.map((item, index) => {
        let dateTime = new Date(item.day);
        console.log("time",dateTime.getDate());  
        item['time'] = dateTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        journalArray[dateTime.getDate()].push(item);
    });

    let journals = journalArray.map((item, index) => {
        if (item.length) {
            return (
                <div>
                    <div className="row journal">
                        <div className="col-md-3">
                            <div className="journal-date">{index}<br /> Sat</div>
                        </div>
                        <div className="col-md-9">
                            <ul class="side-nav">
                                {item.map((item1, index1) => {
                                    return (
                                        <li class="">
                                            <div class="float-left iconbox">
                                                <img src={item1.imagepath} alt="image" />
                                            </div>
                                            <div class="float-left navtext">
                                                <p>{item1.title} <span>{item1.time}</span></p>
                                                <p>{item1.description}</p>
                                            </div>
                                            <div className="clear"></div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <hr />
                </div>
            )
        }
    })
    let cData = localStorage.getItem("chartData") != null ? JSON.parse(localStorage.getItem("chartData")) : JSON.parse('{"labels":["Activity","Mood","Sleep"],"data":[0,0,0]}');
    let color = ["#ff6622", "#00bbb6", "#41b9f8"];
    let legend = ["Activity", "Mood", "Sleep"];
    let graph = chartData.data.map((item, index) => {
        data.push({
            name: legend[index],
            x: item,
            fill: color[index],
        });
    })
    const style = {
        lineHeight: '24px',
        left: "10px",
        width: '100%'
    };
    return (
        <div className="row rightpanel-bottom">
            <div className="col-md-12">
                <RadialBarChart width={400}
                    height={350}
                    data={data}
                    cx={200} cy={150} innerRadius={20} outerRadius={140} barSize={20}>
                    <RadialBar minAngle={30} background clockWise dataKey="x" />
                    <Legend iconSize={10} width={120} height={56} layout="horizontal" verticalAlign="bottom" wrapperStyle={style} />
                </RadialBarChart>
                {/* <ProgressChart
                      data={data}
                      width={519}
                      height={500}
                      chartConfig={{
                        backgroundColor: '#008000',
                        backgroundGradientFrom: '#F0F2F3',
                        backgroundGradientTo: '#F0F2F3',
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                          borderRadius: 16,
                          marginVertical: 8,
                        },
                      }
                    } 
                    />*/}
            </div>
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-6 journal">
                        <h3>Journal</h3>
                    </div>
                </div>
                <div className='journal-scroll'>
                    {journals}
                </div>
            </div>
        </div>
    );
}

export default Rightpanel;