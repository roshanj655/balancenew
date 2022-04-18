
function USerDetails(props) {
    var dob = new Date(props.data.dob);
    return (
        <div className="profile bg-white">
            <div className="row">
                <div className="col-md-8 bg-white">
                    <div className="col-md-12">
                        <label className="labels">Full Name</label><input type="text" className="form-control border-bottom" value={props.data.firstName} />
                    </div>
                    <div className="row mt-2 p0">
                        <div className="col-md-6"><label className="labels">Weight</label><input type="text" className="form-control border-bottom" value="" /></div>
                        <div className="col-md-6"><label className="labels">Height</label><input type="text" className="form-control border-bottom" value=""  /></div>
                    </div>
                    <div className="col-md-12">
                        <label className="labels">Birthday</label><input type="text" className="form-control border-bottom" value={dob.getDay() + "-" + dob.getMonth() + "-" + dob.getFullYear()} />
                    </div>
                    <div className="col-md-12">
                        <label className="labels">Location</label><input type="text" className="form-control border-bottom" value="" />
                    </div>
                    <div className="col-md-12">
                        <label className="labels">ZIP Code</label><input type="text" className="form-control border-bottom" value="" />
                    </div>
                    <div className="col-md-12">
                        <label className="labels">Bio</label><input type="text" className="form-control border-bottom" value="" />
                    </div>
                    <div className="col-md-12">
                        <label className="labels">Phone number</label><input type="text" className="form-control border-bottom" value="" />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="row">
                        <div className="col-md-12 border-right">
                            <div className="d-flex flex-column align-items-center text-center p-3 profile-img"><img className="" src="https://statinfer.com/wp-content/uploads/dummy-user.png" /></div>
                            {/* <button className="btn upload-btn">Upload New Picture</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default USerDetails;