import 'react-multi-carousel/lib/styles.css';
import '../css/reviewcarousel.css'
import Carousel from 'react-multi-carousel';
import { OpportunityCard } from "@repo/ui";

export const ReviewCarousel: React.FC = () => {
    return (
        <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
                desktop: {
                breakpoint: {
                    max: 3000,
                    min: 1024
                },
                items: 3,
                partialVisibilityGutter: 40
                },
                mobile: {
                breakpoint: {
                    max: 464,
                    min: 0
                },
                items: 1,
                partialVisibilityGutter: 30
                },
                tablet: {
                breakpoint: {
                    max: 1024,
                    min: 464
                },
                items: 2,
                partialVisibilityGutter: 30
                }
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
            >
            <div className="carousel-item"><OpportunityCard heading="John S. ⭐⭐⭐⭐" subheading="Finally, a site that makes finding local volunteer opportunities easy! I signed up for a food bank shift in minutes." /></div>
            <div className="carousel-item"><OpportunityCard heading="Emily R. ⭐⭐⭐⭐⭐" subheading="As a college student, I love how this app helps me find flexible volunteer roles that fit my busy schedule." /></div>
            <div className="carousel-item"><OpportunityCard heading="Michael T. ⭐⭐⭐⭐⭐" subheading="Small nonprofits like ours struggle to reach volunteers, but this platform has connected us with amazing people!" /></div>
            <div className="carousel-item"><OpportunityCard heading="Sarah L. ⭐⭐⭐⭐" subheading="I used to spend hours searching for volunteer work. This app gives me personalized opportunities in seconds!" /></div>
            <div className="carousel-item"><OpportunityCard heading="David M. ⭐⭐⭐⭐⭐" subheading="The filtering options are a game-changer! I can now find opportunities that match my skills and availability." /></div>
            <div className="carousel-item"><OpportunityCard heading="Rachel B. ⭐⭐⭐⭐" subheading="Volunteering has never been this accessible. I love the variety of opportunities, from one-time events to long-term roles!" /></div>
            <div className="carousel-item"><OpportunityCard heading="James K. ⭐⭐⭐⭐⭐" subheading="I moved to a new city and had no idea where to start. This app helped me get involved in my community right away!" /></div>
            <div className="carousel-item"><OpportunityCard heading="Olivia H. ⭐⭐⭐⭐⭐" subheading="As a teacher, I wanted ways to give back on weekends. This app made it so easy to find meaningful opportunities." /></div>
        </Carousel> 
    );
}