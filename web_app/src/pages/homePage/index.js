import React from 'react';
import { Page } from '../../components/commonStyled';
import { H1, RowContainer, ColumnContainer, TextContainer } from '../../components/commonStyled';

const HomePage = () => (
  <Page>
    <H1 margin >Home</H1>
    <RowContainer noBorder>
      <ColumnContainer width="50%" noBorder></ColumnContainer>
      <ColumnContainer width="50%" noBorder padding="50px">
        <TextContainer>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel lorem. Etiam pellentesque aliquet tellus. Phasellus pharetra nulla ac diam. Quisque semper justo at risus. Donec venenatis, turpis vel hendrerit interdum, dui ligula ultricies purus, sed posuere libero dui id orci. Nam congue, pede vitae dapibus aliquet, elit magna vulputate arcu, vel tempus metus leo non est. Etiam sit amet lectus quis est congue mollis. Phasellus congue lacus eget neque. Phasellus ornare, ante vitae consectetuer consequat, purus sapien ultricies dolor, et mollis pede metus eget nisi. Praesent sodales velit quis augue. Cras suscipit, urna at aliquam rhoncus, urna quam viverra nisi, in interdum massa nibh nec erat.
        </TextContainer>
      </ColumnContainer>
    </RowContainer>
  </Page>
);

export default HomePage;