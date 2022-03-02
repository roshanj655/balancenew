import ProgressChart from '../../mark/progress-chart'
import {
    View,
    ActivityIndicator,
    Dimensions,
    Alert,
    Modal,
    Image,
  } from 'react-native'
function Rightpanel() {
    const data = {
        labels: ["Swim", "Bike", "Run"], // optional
        data: [0.4, 0.6, 0.8]
      };
    return (
        <div className="row rightpanel-bottom">
            <div className="col-md-12">
               
                    <ProgressChart
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
                      }}
                    />
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