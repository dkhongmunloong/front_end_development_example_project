export default function Page_top_search() {
    return (
        <>
            <nav className="navbar bg-body-tertiary">
                <form className="container-fluid">
                    <div className="input-group">
                        <span className="input-group-text text-primary-emphasis fw-semibold" id="basic-addon1">
                            Product Name
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="North face cap"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        ></input>
                        <button className="btn btn-outline-primary" type="submit">
                            Search
                        </button>
                    </div>
                </form>
            </nav>
        </>
    );
}
