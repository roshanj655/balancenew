import ProgressChart from '../../mark/progress-chart'
import {
    View,
    ActivityIndicator,
    Dimensions,
    Alert,
    Modal,
    Image,
} from 'react-native-web'
import { RadialBarChart, RadialBar } from 'recharts';
function Rightpanel() {
    // const data = {
    //     labels: ["Swim", "Bike", "Run"], // optional
    //     data: [0.4, 0.6, 0.8]
    //   };
    let data = [];
    // const myTimeout = setTimeout(function () {
        let cData = JSON.parse(localStorage.getItem("chartData"));
        let color = ["#ff6622", "#00bbb6", "#41b9f8"];
        let graph = cData.data.map((item, index) => {
            data.push({
                name: "Activity",
                x: item,
                fill: color[index],
            });
        })
        console.log('right', data);
    // }, 1000);


    //   const data = [
    //     {
    //       name: 'Swim',
    //       x: 31.47,
    //       fill: '#ff6622',
    //     },
    //     {
    //       name: 'Bike',
    //       x: 26.69,
    //       fill: '#00bbb6',
    //     },
    //     {
    //       name: 'Cycling',
    //       x: 15.69,
    //       fill: '#41b9f8',
    //     },

    //   ];  
    return (
        <div className="row rightpanel-bottom">
            <div className="col-md-12">
                <RadialBarChart width={500}
                    height={500}
                    data={data}
                    innerRadius="20%"
                    outerRadius="70%">
                    <RadialBar minAngle={30}
                        dataKey="x" clockWise />
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
                    <div className="col-md-6">
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
                    </div>
                </div>
                <div className="row journal">
                    <div className="col-md-3">
                        <div className="journal-date">18 Sat</div>
                    </div>
                    <div className="col-md-9">
                        <ul class="side-nav">
                            <li class="">
                                <div class="float-left iconbox">
                                    <img src="assets/images/Activities/swimming.png" alt="image" />
                                </div>
                                <div class="float-left navtext">
                                    <p>Reduce Anxiety <span>2:45 pm</span></p>
                                    <p>This is for test</p>
                                </div>
                                <div className="clear"></div>
                            </li>
                            <li>
                                <div class="float-left iconbox">
                                    <img src="assets/images/Activities/swimming.png" alt="image" />
                                </div>
                                <div class="float-left navtext">
                                    <p>Relax <span>2:45 pm</span></p>
                                    <p>Add Your Sleep Time</p>
                                </div>
                                <div className="clear"></div>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr />
                <div className="row journal">
                    <div className="col-md-3">
                        <div className="journal-date">18 Sat</div>
                    </div>
                    <div className="col-md-9">
                        <ul class="side-nav">
                            <li class="">
                                <div class="float-left iconbox">
                                    <img src="assets/images/Activities/swimming.png" alt="image" />
                                </div>
                                <div class="float-left navtext">
                                    <p>Reduce Anxiety <span>2:45 pm</span></p>
                                    <p>This is for test</p>
                                </div>
                                <div className="clear"></div>
                            </li>
                            <li>
                                <div class="float-left iconbox">
                                    <img src="assets/images/Activities/swimming.png" alt="image" />
                                </div>
                                <div class="float-left navtext">
                                    <p>Relax <span>2:45 pm</span></p>
                                    <p>Add Your Sleep Time</p>
                                </div>
                                <div className="clear"></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Rightpanel;