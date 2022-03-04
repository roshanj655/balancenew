import  React  from 'react';
import Slept from './Slept';
import Activity from './Activity';
import Felt from './Felt';
import Mindfull from './Mindfull';
// import Moodspopup from './Moodspopup';
function Dashboard() {
    // var isBoxVisible="hide";
    var isBoxVisible = React.useState('hide');
    function toggleBox() {
        isBoxVisible= isBoxVisible=="hide"?"show":"hide";
        alert(isBoxVisible);
      };
    return (
        <div className="row">
            <div className='col-md-12'>
                <h2 className='wish-title'>Good Morning, Susan</h2>
                <p className='wish-sub-title'>You have <span class="badge badge-pill badge-danger">2</span> new task and 5% sleep to reach your goal</p>
            </div>
            <div className='col-md-6'>
                <Felt />
            </div>
            <div className='col-md-6'>
                <Slept />
            </div>
            <div className='col-md-6'>
                <Activity />
            </div>
            <div className='col-md-6' name={isBoxVisible}  onClick={toggleBox}>
                <Mindfull />
            </div>
        </div>
    );
}

export default Dashboard;