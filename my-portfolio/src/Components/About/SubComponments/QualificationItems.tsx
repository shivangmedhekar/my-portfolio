import React from 'react';

interface QualificationItemProps {
    title: string;
    subtitle: string;
    calendar: string;
  }
  
  // Create an array of qualification items
  interface QualificationItemListProps {
    qualificationItems: QualificationItemProps[];
  }
  
  const QualificationItems: React.FC <QualificationItemListProps> = ( {qualificationItems} ) => {

    console.log(qualificationItems.length - 1);
    return (
        <div className="qualification__container container">
        {/* Map and render qualification items */}
        {qualificationItems.map((item: {title: string, subtitle: string, calendar: string}, i: number) => (
            
            <div className="qualification__data" key={i}>
            {i % 2 !== 0 && (
                <>
                <div></div>
                <div>
                    <span className="qualification__rounder"></span>
                    {/* Condtion to not add line at the end */}
                    {i !== qualificationItems.length - 1 && <span className="qualification__line"></span>}
                </div>
                </>
            )}

            <div>
                <h3 className="qualification__title">{item.title}</h3>
                <span className="qualification__subtitle">{item.subtitle}</span>
                <div className="qualification__calendar">
                <i className="uil uil-calendar-alt"></i>
                {` ${item.calendar}`}
                </div>
            </div>

            {i % 2 === 0 && (
                <div>
                    <span className="qualification__rounder"></span>
                    {/* Condtion to not add line at the end */}
                    {i !== qualificationItems.length - 1 && <span className="qualification__line"></span>}
                </div>
            )}
            </div>
        ))}
        </div>
        
    );
  };

export default QualificationItems;
