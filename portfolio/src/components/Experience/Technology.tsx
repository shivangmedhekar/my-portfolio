import React from 'react';

import { Row, Col } from 'antd';

import Skill from './Skill';

interface TechnologysProps {
    name: string;
    skillList: { name: string; level: string }[];
}

const Technology: React.FC<TechnologysProps> = ({ name, skillList }) => {
    return (
        <div className="details-container">
            <h2 className="experience-sub-title">{ name }</h2>

            <div className="article-container">

                <Row>
                    {skillList.map((skill) => (
                        <Col xs={12} sm={12} md={12} lg={8} xl={6}>
                            <Skill key={skill.name} name={skill.name} level={skill.level} />
                        </Col>
                    ))}
                </Row>
                

            </div>
        </div>
    );
}

export default Technology;