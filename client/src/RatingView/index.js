import React, { Component } from 'react';
import glamorous from 'glamorous';
import './style.css';

const Position = glamorous.h2({
  color: '#e46069',
  fontWeight: 400,
  display: 'inline-block',
  margin: 0
});

const Wrapper = glamorous.div({
  padding: '0 32px'
});

const Header = glamorous.div({
  width: 'calc(100% - 16px)',
  backgroundColor: '#e46069',
  padding: '8px',
  borderTopLeftRadius: '32px',
  borderTopRightRadius: '32px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
});

const Applicant = glamorous.h3({
  marginLeft: '32px',
  color: 'white',
  display: 'inline-block'
});

const Percentage = glamorous.h3({
  color: 'white',
  marginRight: '64px'
})

const Card = glamorous.div({
  borderRadius: '32px',
  boxShadow: '4px 4px 8px #AAAAAA',
  border: '1px solid #e46069',
  backgroundColor: '#e46069',
  marginTop: '24px'
});

const ContentWrapper = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: '#F4ECE1',
  borderBottomLeftRadius: '32px',
  borderBottomRightRadius: '32px'
})

const ResumeWrapper = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  flex: 1,
  padding: '32px 32px 0 48px',
});

const LetterWrapper = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  flex: 4,
  padding: '16px'
});

const SubHeading = glamorous.h3({
  fontSize: '14px',
  color: '#e46069',
  margin: '12px 0 0 0',
});

const RatingButtons = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: '60%',
  marginLeft: '20%',
  marginTop: '12px',
  position: 'absolute',
  bottom: '24px'
});

const Button = glamorous.div({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  borderWidth: '2px',
  borderStyle: 'solid',
  display: 'flex',
  justifyContent: 'center',
  cursor: 'pointer'
});

const ButtonContent = glamorous.div({
  marginTop: '12px',
  fontWeight: '700'
});

class RatingView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ready: false,
      visible: true
    }
  }

  createButton = (value, color) => (
    <Button style={{ color, borderColor: color }} onClick={() => {
      this.setState({ ready: true });
      setTimeout(() => this.setState({ visible: false }), 999);
    }}>
      <ButtonContent>
        {value}
      </ButtonContent>
    </Button>
  );

  render() {
    return (
      <Wrapper>
        <Position>Sales manager - Patu Systems Oy</Position>
        { this.state.visible ?
          <div className={this.state.ready ? 'hidden-rate' : ''}>
            <Card>
              <Header>
                <Applicant>Applicant: Patu Patukka</Applicant>
                <Percentage>{(Math.random() * 100).toFixed(0)}%</Percentage>
              </Header>
              <ContentWrapper>
                <ResumeWrapper>
                  <SubHeading>Education</SubHeading>
                  <p>Bachelor of Patu</p>
                  <SubHeading>Previous employer</SubHeading>
                  <p>Patu Software Oy</p>
                </ResumeWrapper>
                <LetterWrapper>
                  <SubHeading>Cover letter summary</SubHeading>
                  <p>I think that Futurice has an interesting and different take in the work-life balance and would be a great learning experience and stepping stone in the world of a young doer.
      In addition to the random projects I tend to create for myself, I like to do sports, spend time with friends, photograph and try to stay on top of things happening in the world (i.e. browse the internet).
      From my portfolio (http://patu.fi/) I’d like to point out a project I’ve been creating for a while now: Infoboard.
      In the past year I’ve been doing mostly Java back-end and SQL in my work, but would really like to learn more about front-end technologies and IoT in lean and modern software development environment.
                  </p>
                </LetterWrapper>
              </ContentWrapper>
            </Card>
          </div>
        : null }
        <RatingButtons>
          {this.createButton(1, '#e46069')}
          {this.createButton(2, '#ED999F')}
          {this.createButton(3, '#bbbbbb')}
          {this.createButton(4, '#A0D7AB')}
          {this.createButton(5, '#6AC17B')}
        </RatingButtons>
      </Wrapper>
    )
  }
}

export default RatingView
