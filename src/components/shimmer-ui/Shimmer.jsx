"use client";
import "./Shimmer.css";
const Shimmer = () => {
  return (
    <>
      <div className="auction-slider-area mb-70 wow animate fadeInUp">
        <div className="row">
          {Array(2)
            .fill()
            .map((_, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <div className="skeleton-card">
                  <div className="skeleton skeleton-img"></div>
                  <div
                    className="skeleton skeleton-text"
                    style={{ width: "80%", marginTop: "15px" }}
                  ></div>
                  <div
                    className="skeleton skeleton-text"
                    style={{ width: "60%", marginTop: "10px" }}
                  ></div>
                  <div
                    className="skeleton skeleton-price"
                    style={{ marginTop: "20px" }}
                  ></div>
                  <div
                    className="skeleton skeleton-btn"
                    style={{ marginTop: "30px" }}
                  ></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Shimmer;
