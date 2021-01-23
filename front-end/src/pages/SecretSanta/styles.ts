import styled from 'styled-components';
import { lighten, shade } from 'polished';

export const LoadingScreen = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.header`
  width: 100%;
  padding: 56px 16px;
  background: #050517;

  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    color: #D3D5D7;
    padding-bottom: 16px;
    border-bottom: 1px solid #D3D5D7;
  }

  span {
    color: #D3D5D7;
    margin-top: 16px;
    font-size: 18px;
  }

  a {
    text-decoration: none;
    color: #ffffff;

    display: flex;
    align-items: center;

    position: absolute;
    top: 56px;
    left: 56px;

    & > svg {
      margin-right: 8px;
    }
  }
`;

export const Container = styled.div`
  max-width: 1080px;
  width: 100%;
  margin: 0 auto;
  padding: 0 24px;
`;

export const FormContainer = styled.form`
  width: 100%;
  padding: 40px 24px 24px;
  border-bottom: 2px solid #EFC88B;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  & > input {
    width: 100%;
    height: 56px;
    padding: 0 16px;
    border-radius: 16px;
    border: 2px solid transparent;

    &:hover {
      border-color: #EFC88B;
    }

    &:focus {
      border-color: #CF5C36;
    }

    & + input {
      margin-top: 16px;
    }
  }

  & > button {
    padding: 0 16px;
    height: 56px;
    border-radius: 16px;
    border: unset;
    background: #CF5C36;
    color: #F4E3B2;
    font-weight: bold;
    margin-top: 16px;
    transition: all 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    & > svg {
      margin-right: 8px;
    }

    &:hover {
      background: ${shade(0.2, '#CF5C36')};
      box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.25);
    }
  }
`;

export const SweepstakePeopleContainer = styled.div`
  width: 100%;
  padding: 40px 24px 24px;

  & > div {
    margin-bottom: 16px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    & > h2 {
      color: #CF5C36;
    }

    & > button {
      padding: 0 16px;
      height: 56px;
      border-radius: 16px;
      border: 2px solid #CF5C36;
      background: transparent;
      color: #CF5C36;
      font-weight: bold;
      transition: all 0.2s;

      display: flex;
      align-items: center;
      justify-content: center;

      & > svg {
        margin-right: 8px;
      }

      &:hover {
        background: #CF5C36;
        color: #F4E3B2;
        box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.25);
      }
    }
  }
`;

export const PeopleList = styled.ul`
  width: 100%;
  list-style: none;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const PeopleListItem = styled.li`
  width: 48%;
  padding: 24px;
  background: #EFC88B;
  border-radius: 16px;
  transition: all 0.2s;
  margin: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: ${shade(0.025, '#EFC88B')};
  }

  & > div {
    display: flex;
    flex-wrap: wrap;

    &:first-child {
      flex: 1;
    }

    & > strong {
      font-size: 20px;
      width: 100%;
    }

    & > span {
      width: 100%;
      margin-top: 8px;
    }

    & > button {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: unset;
      color: #ffffff;
      margin-left: 8px;
      transition: all 0.2s;

      display: flex;
      justify-content: center;
      align-items: center;

      &:first-child {
        background: #3498db;

        &:hover {
          background: ${lighten(0.1, '#3498db')};
        }
      }

      &:last-child {
        background: #c0392b;

        &:hover {
          background: ${lighten(0.1, '#c0392b')};
        }
      }
    }
  }
`;
