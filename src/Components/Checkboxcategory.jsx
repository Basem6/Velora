
    import styled from 'styled-components';
    const CheckboxCategory = ({ onChange, checked }) => {
    return (
        <StyledWrapper>
        <label className="checkbox-container">
            <input className="custom-checkbox"   type="checkbox" checked={checked} onChange={onChange} />
            <span className="checkmark" />
        </label>
        </StyledWrapper>
    );
    }

    const StyledWrapper = styled.div`
    .checkbox-container {
        display: inline-block;
        position: relative;
        padding-left: 21px;
        background-color: transparent;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 16px;
        user-select: none;
    }

    .custom-checkbox {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        background-color: transparent;
        width: 0;
    }

    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 22px;
        width: 22px;
        font-size: 16px;
        background-color: #eee;
        border-radius: 4px;
        transition: background-color 0.3s;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }

    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
    }

    .custom-checkbox:checked ~ .checkmark {
        background-color: #c8a882;
        box-shadow: 0 3px 7px rgba(33, 150, 243, 0.3);
    }
    .custom-checkbox:checked ~ .checkmark:after {
        display: block;
    }

    @keyframes checkAnim {
        0% {
        height: 0;
        }

        100% {
        height: 10px;
        }
    }

    .custom-checkbox:checked ~ .checkmark:after {
        animation: checkAnim 0.2s forwards;
    }`;

    export default CheckboxCategory;
