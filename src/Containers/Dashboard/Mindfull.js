
function Mindfull() {
    
    return (
        <div className="slept">
            <h4>You Mindfull Bonues</h4>
            <ul className=" justify-content-end nav nav-tabs mb-3" id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <a
                        className="nav-link active"
                        id="ex1-tab-1"
                        data-mdb-toggle="tab"
                        href="#ex1-tabs-1"
                        role="tab"
                        aria-controls="ex1-tabs-1"
                        aria-selected="true"
                    >Day</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a
                        className="nav-link"
                        id="ex1-tab-2"
                        data-mdb-toggle="tab"
                        href="#ex1-tabs-2"
                        role="tab"
                        aria-controls="ex1-tabs-2"
                        aria-selected="false"
                    >Week</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a
                        className="nav-link"
                        id="ex1-tab-3"
                        data-mdb-toggle="tab"
                        href="#ex1-tabs-3"
                        role="tab"
                        aria-controls="ex1-tabs-3"
                        aria-selected="false"
                    >Month</a>
                </li>
            </ul>
            <div className="tab-content" id="ex1-content">
                <div
                    className="flexbox tab-pane fade show active"
                    id="ex1-tabs-1"
                    role="tabpanel"
                    aria-labelledby="ex1-tab-1">
                    <h2 className="flex-item not-found">No Content Found</h2>
                </div>
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

export default Mindfull;