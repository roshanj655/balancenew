import ProgressChart from '../../mark/progress-chart'
import {
    View,
    ActivityIndicator,
    Dimensions,
    Alert,
    Modal,
    Image,
} from 'react-native-web'
import { RadialBarChart, RadialBar,Legend } from 'recharts';
function Rightpanel() {
    // const data = {
    //     labels: ["Swim", "Bike", "Run"], // optional
    //     data: [0.4, 0.6, 0.8]
    //   };
    let data = [];
    // const myTimeout = setTimeout(function () {
    let journal = [];
    let activity = JSON.parse(localStorage.getItem("activities")) ?? [];
    let moods = JSON.parse(localStorage.getItem("moods")) ?? [];
    activity.map((item, index) => {
        item['title'] = "Activity";
        item['description'] = "You play " + item.type + " for " + item.duration + " min"
        journal.push(item);
    });
    moods.map((item, index) => {
        item['title'] = "Mood";
        item['description'] = "You felt " + item.type
        journal.push(item);
    });
    let journalArray = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
    journal.map((item, index) => {
        let dateTime = new Date(item.day);
        item['time'] = dateTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        journalArray[dateTime.getDate()].push(item);
    });
    console.log("journal", journalArray);
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
                                                <img src="assets/images/Activities/swimming.png" alt="image" />
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
    let legend = ["Activity","Mood","Sleep"];
    let graph = cData.data.map((item, index) => {
        data.push({
            name: legend[index],
            x: item,
            fill: color[index],
        });
    })
    const style = {
        lineHeight: '24px',
        left:"10px",
        width:'100%'
    };
    return (
        <div className="row rightpanel-bottom">
            <div className="col-md-12">
                <RadialBarChart width={400}
                    height={450}
                    data={data}
                    cx={200} cy={150} innerRadius={20} outerRadius={140} barSize={20}>
                    <RadialBar  minAngle={30} label={{ position: 'insideStart', fill: '#fff' }} background clockWise dataKey="x" />
                    <Legend iconSize={10} width={120} height={140} layout="horizontal" verticalAlign="bottom" wrapperStyle={style} />
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
                    {/* <div className="col-md-6">
                        <div class="dropdown">
                            <div class=" dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                18 December 2021
                            </div>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <a class="dropdown-item" href="#">Something else here</a>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className='journal-scroll'>
                    {journals}
                </div>
            </div>
        </div>
    );
}

export default Rightpanel;