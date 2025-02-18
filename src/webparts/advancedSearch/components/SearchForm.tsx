/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, TextField, PrimaryButton, DefaultButton, IStackTokens, Dropdown, IDropdownOption, IStackStyles  } from "@fluentui/react";
import * as React from "react";
import { Globals } from "../Globals";

export interface ISearchFormProps {
    classificationCodeList: IDropdownOption[];
    classificationLevelList: any;
    departmentList: any;
    durationList: any;
    durationOperatorsList: any;
    languageRequirementList: any;
    //languageComprehensionList: any;
    cityList: any;
}

export enum AdvancedSearchSessionKeys {
    JobTitle = 'gcx-cm-jobTitle',
    ClassificationCode = 'gcx-cm-classificationCode',
    ClassificationLevel = 'gcx-cm-classificationLevel',
    Department = 'gcx-cm-department',
    Duration = 'gcx-cm-duration',
    DurationQuantity = 'gcx-cm-durationQuantity',
    DurationOperator = 'gcx-cm-durationOperator',
    LanguageRequirement = 'gcx-cm-languageRequirement',
    //LanguageComprehension = 'gcx-cm-languageComprehension',
    City = 'gcx-cm-city'
}

const SearchForm = (props: ISearchFormProps) => {
    const strings = Globals.getStrings();
    //const comprehensionDefault = 'CCC-CCC';
    //const comprehensionSingleDefault = 'C';

    const [jobTitle, setJobTitle] = React.useState('');
    const [classificationCode, setClassificationCode] = React.useState('');
    const [classificationLevel, setClassificationLevel] = React.useState('');
    const [department, setDepartment] = React.useState('');
    const [duration, setDuration] = React.useState('');
    const [durationQuantity, setDurationQuantity] = React.useState('');
    const [durationOperator, setDurationOperator] = React.useState('1');
    const [languageRequirement, setLanguageRequirement] = React.useState('');
    //const [languageComprehension, setLanguageComprehension] = React.useState(comprehensionDefault);
    const [city, setCity] = React.useState('');

    const SetSessionKeys = (): void => {
        sessionStorage.setItem(AdvancedSearchSessionKeys.JobTitle, jobTitle);
        sessionStorage.setItem(AdvancedSearchSessionKeys.ClassificationCode, classificationCode);
        sessionStorage.setItem(AdvancedSearchSessionKeys.ClassificationLevel, classificationLevel);
        sessionStorage.setItem(AdvancedSearchSessionKeys.Department, department);
        sessionStorage.setItem(AdvancedSearchSessionKeys.Duration, duration);
        sessionStorage.setItem(AdvancedSearchSessionKeys.DurationQuantity, durationQuantity);
        sessionStorage.setItem(AdvancedSearchSessionKeys.DurationOperator, durationOperator);
        sessionStorage.setItem(AdvancedSearchSessionKeys.LanguageRequirement, languageRequirement);
        //sessionStorage.setItem(AdvancedSearchSessionKeys.LanguageComprehension, languageComprehension);
        sessionStorage.setItem(AdvancedSearchSessionKeys.City, city);

        if (Globals.isDebugMode()) {
            console.log('\njobTitle: ' + jobTitle);
            console.log('classificationCode: ' + classificationCode);
            console.log('classificationLevel: ' + classificationLevel);
            console.log('department: ' + department);
            console.log('duration: ' + duration);
            console.log('durationQuantity: ' + durationQuantity);
            console.log('durationOperator: ' + durationOperator);
            console.log('languageRequirement: ' + languageRequirement);
            //console.log('languageComprehension: ' + languageComprehension);
            console.log('city: ' + city +'\n');
        }
        
    }

    const ClearSessionKeys = (): void => {
        sessionStorage.removeItem(AdvancedSearchSessionKeys.JobTitle);
        sessionStorage.removeItem(AdvancedSearchSessionKeys.ClassificationCode);
        sessionStorage.removeItem(AdvancedSearchSessionKeys.ClassificationLevel);
        sessionStorage.removeItem(AdvancedSearchSessionKeys.Department);
        sessionStorage.removeItem(AdvancedSearchSessionKeys.Duration);
        sessionStorage.removeItem(AdvancedSearchSessionKeys.DurationQuantity);
        sessionStorage.removeItem(AdvancedSearchSessionKeys.DurationOperator);
        sessionStorage.removeItem(AdvancedSearchSessionKeys.LanguageRequirement);
        //sessionStorage.removeItem(AdvancedSearchSessionKeys.LanguageComprehension);
        sessionStorage.removeItem(AdvancedSearchSessionKeys.City);
    }

    const ClearValues = (): void => {
        setJobTitle('');
        setClassificationCode('');
        setClassificationLevel('');
        setDepartment('');
        setDuration('');
        setDurationQuantity('');
        setDurationOperator('1');
        setLanguageRequirement('');
        //setLanguageComprehension(comprehensionDefault);
        setCity('');

        ClearSessionKeys();
    };

    React.useEffect(() => {
        SetSessionKeys();
    }, [jobTitle, classificationCode, classificationLevel, department, duration, durationQuantity, durationOperator, languageRequirement, /* languageComprehension, */ city]);

    // const updateLanguageComprehension = (index: number, value: string): void => {
    //     if (index >= 0 && index <= languageComprehension.length) {
    //         setLanguageComprehension(languageComprehension.slice(0, index) + value + languageComprehension.slice(index + 1));
    //     } else {
    //         if (Globals.isDebugMode())
    //             console.error('Index out of bounds for language comprehension.')
    //     }
    // };

    const titleStyle = {
        fontWeight: '500', 
        paddingBottom: '4px', 
        fontSize: '14px'
    }

    const titleStyleNoPadding = {
        ...titleStyle,
        paddingBottom: 'unset'
    };

    const borderColor: string = '#c2c2c2';
    const stackTokens: IStackTokens = { childrenGap: 20 };
    const stackTokensDuration: IStackTokens = { childrenGap: 15 };
    const stackStyles: IStackStyles = {
        root: {
            width: '100%',
        },
    };
    // const compStackStyle= {
    //     root: {
    //         width: '100%',
    //         padding: '10px 15px',
    //         gap: '15px'
    //     }
    // }

    if (Globals.isOpen()){
        SetSessionKeys();
    } else {
        ClearSessionKeys();
    }

    return (
        <>
        <Stack>
            <Stack horizontal verticalAlign='center'>
                <label id='gcx-as-job-title-label'>
                    <b style={titleStyle}>
                        {strings.JobTitle}
                    </b>
                </label>
            </Stack>
            <TextField 
                id='txtJobTitle' 
                aria-labelledby='gcx-as-job-title-label'
                styles={{fieldGroup: { borderColor: borderColor }}}  
                onChange={(e) => setJobTitle(e.currentTarget.value)} 
                value={jobTitle} 
            /><br />

            <Stack horizontal verticalAlign='center'>
                <label id='gcx-as-department-label'>
                    <b style={titleStyle}>
                        {strings.Department}
                    </b>
                </label>
            </Stack>
            <Dropdown 
                id='ddDepartment' 
                aria-labelledby='gcx-as-department-label'
                styles={{title: { borderColor: borderColor }}} 
                options={props.departmentList} 
                onChange={(e, option) => { 
                    if (option) {
                        setDepartment(option.key.toString());
                    }
                    else {
                        setDepartment('');
                    }
                }}
                selectedKey={department ? parseInt(department, 10) : null} 
            /><br />

            <Stack horizontal verticalAlign='center' tokens={stackTokens}>
                <label id='gcx-as-classification-code-label'>
                    <b style={titleStyleNoPadding}>
                        {strings.ClassificationCode}:
                    </b>
                </label>
                <Dropdown 
                    id='ddClassificationCode' 
                    aria-labelledby='gcx-as-classification-code-label'
                    styles={{title: { borderColor: borderColor }}} 
                    style={{minWidth: '90px'}}
                    options={props.classificationCodeList} 
                    onChange={(e, option) => { 
                        if (option) {
                            setClassificationCode(option.key.toString());
                        }
                        else {
                            setClassificationCode('');
                        }
                    }}
                    selectedKey={classificationCode ? parseInt(classificationCode, 10) : null} 
                />
                <label id='gcx-as-classification-level-label'>
                    <b style={titleStyleNoPadding}>
                        {strings.Level}:
                    </b>
                </label>
                <Dropdown 
                    id='ddClassificationLevel' 
                    aria-labelledby='gcx-as-classification-level-label'
                    styles={{title: { borderColor: borderColor }}} 
                    style={{minWidth: '50px'}}
                    options={props.classificationLevelList} 
                    onChange={(e, option) => { 
                        if (option) {
                            setClassificationLevel(option.key.toString());
                        }
                        else {
                            setClassificationLevel('');
                        }
                    }}
                    selectedKey={classificationLevel ? parseInt(classificationLevel, 10) : null} 
                />
            </Stack><br />

            <Stack horizontal verticalAlign='center'>
                <label id='gcx-as-language-requirement-label'>
                    <b style={titleStyle}>
                        {strings.LanguageRequirement}
                    </b>
                </label>
            </Stack>
            <Dropdown 
                id='ddLanguageRequirement' 
                aria-labelledby='gcx-as-language-requirement-label'
                styles={{title: { borderColor: borderColor }}} 
                options={props.languageRequirementList} 
                onChange={(e, option) => { 
                    if (option) {
                        setLanguageRequirement(option.key.toString());
                        // if (languageRequirement !== '3')
                        //     setLanguageComprehension(comprehensionDefault);
                    }
                    else {
                        setLanguageRequirement('');
                    }
                }}
                selectedKey={languageRequirement ? parseInt(languageRequirement, 10) : null} 
            /><br />

            {/* { languageRequirement === '3' ? (
                <div>

                    <label>
                        <b style={titleStyle}>
                            {strings.Reading}
                        </b>
                    </label>
                    <Stack horizontal verticalAlign='center' styles={compStackStyle}>
                        
                        <Stack verticalAlign='center' styles={stackStyles}>
                            <label id='gcx-as-language-comprehension-label'>
                                <b style={titleStyle}>
                                    {strings.English}
                                </b>
                            </label>
                            <Dropdown 
                                //aria-labelledby='gcx-as-language-comprehension-en-reading-label'
                                styles={{title: { borderColor: borderColor }}} 
                                options={props.languageComprehensionList} 
                                onChange={(e, option) => { 
                                    if (option) {
                                        updateLanguageComprehension(0, option.text);
                                    }
                                    else {
                                        updateLanguageComprehension(0, comprehensionSingleDefault);
                                    }
                                }} 
                                selectedKey={
                                    languageComprehension
                                    ? props.languageComprehensionList.find(
                                        (item: any) => item.text === languageComprehension[0] 
                                    )?.key : null
                                } 
                            />
                        </Stack>
                        <Stack verticalAlign='center' styles={stackStyles}>
                            <label id='gcx-as-language-comprehension-label'>
                                <b style={titleStyle}>
                                    {strings.French}
                                </b>
                            </label>
                            <Dropdown 
                                //aria-labelledby='gcx-as-language-comprehension-en-reading-label'
                                styles={{title: { borderColor: borderColor }}} 
                                options={props.languageComprehensionList} 
                                onChange={(e, option) => { 
                                    if (option) {
                                        updateLanguageComprehension(4, option.text);
                                    }
                                    else {
                                        updateLanguageComprehension(4, comprehensionSingleDefault);
                                    }
                                }} 
                                selectedKey={
                                    languageComprehension
                                    ? props.languageComprehensionList.find(
                                        (item: any) => item.text === languageComprehension[4] 
                                    )?.key : null
                                } 
                            />
                        </Stack>
                    </Stack>

                    <label>
                        <b style={titleStyle}>
                            {strings.Written}
                        </b>
                    </label>
                    <Stack horizontal verticalAlign='center' styles={compStackStyle}>
                        
                        <Stack verticalAlign='center' styles={stackStyles}>
                            <label id='gcx-as-language-comprehension-label'>
                                <b style={titleStyle}>
                                    {strings.English}
                                </b>
                            </label>
                            <Dropdown 
                                //aria-labelledby='gcx-as-language-comprehension-en-reading-label'
                                styles={{title: { borderColor: borderColor }}} 
                                options={props.languageComprehensionList} 
                                onChange={(e, option) => { 
                                    if (option) {
                                        updateLanguageComprehension(1, option.text);
                                    }
                                    else {
                                        updateLanguageComprehension(1, comprehensionSingleDefault);
                                    }
                                }} 
                                selectedKey={
                                    languageComprehension
                                    ? props.languageComprehensionList.find(
                                        (item: any) => item.text === languageComprehension[1] 
                                    )?.key : null
                                } 
                            />
                        </Stack>
                        <Stack verticalAlign='center' styles={stackStyles}>
                            <label id='gcx-as-language-comprehension-label'>
                                <b style={titleStyle}>
                                    {strings.French}
                                </b>
                            </label>
                            <Dropdown 
                                //aria-labelledby='gcx-as-language-comprehension-en-reading-label'
                                styles={{title: { borderColor: borderColor }}} 
                                options={props.languageComprehensionList} 
                                onChange={(e, option) => { 
                                    if (option) {
                                        updateLanguageComprehension(5, option.text);
                                    }
                                    else {
                                        updateLanguageComprehension(5, comprehensionSingleDefault);
                                    }
                                }} 
                                selectedKey={
                                    languageComprehension
                                    ? props.languageComprehensionList.find(
                                        (item: any) => item.text === languageComprehension[5] 
                                    )?.key : null
                                } 
                            />
                        </Stack>
                    </Stack>

                    <label>
                        <b style={titleStyle}>
                            {strings.Oral}
                        </b>
                    </label>
                    <Stack horizontal verticalAlign='center' styles={compStackStyle}>
                        
                        <Stack verticalAlign='center' styles={stackStyles}>
                            <label id='gcx-as-language-comprehension-label'>
                                <b style={titleStyle}>
                                    {strings.English}
                                </b>
                            </label>
                            <Dropdown 
                                //aria-labelledby='gcx-as-language-comprehension-en-reading-label'
                                styles={{title: { borderColor: borderColor }}} 
                                options={props.languageComprehensionList} 
                                onChange={(e, option) => { 
                                    if (option) {
                                        updateLanguageComprehension(2, option.text);
                                    }
                                    else {
                                        updateLanguageComprehension(2, comprehensionSingleDefault);
                                    }
                                }} 
                                selectedKey={
                                    languageComprehension
                                    ? props.languageComprehensionList.find(
                                        (item: any) => item.text === languageComprehension[2] 
                                    )?.key : null
                                } 
                            />
                        </Stack>
                        <Stack verticalAlign='center' styles={stackStyles}>
                            <label id='gcx-as-language-comprehension-label'>
                                <b style={titleStyle}>
                                    {strings.French}
                                </b>
                            </label>
                            <Dropdown 
                                //aria-labelledby='gcx-as-language-comprehension-en-reading-label'
                                styles={{title: { borderColor: borderColor }}} 
                                options={props.languageComprehensionList} 
                                onChange={(e, option) => { 
                                    if (option) {
                                        updateLanguageComprehension(6, option.text);
                                    }
                                    else {
                                        updateLanguageComprehension(6, comprehensionSingleDefault);
                                    }
                                }} 
                                selectedKey={
                                    languageComprehension
                                    ? props.languageComprehensionList.find(
                                        (item: any) => item.text === languageComprehension[6] 
                                    )?.key : null
                                } 
                            />
                        </Stack>
                    </Stack>
                </div>
                
            ) : null} */}
            
            <Stack horizontal verticalAlign='center'>
                <label id='gcx-as-location-label'>
                    <b style={titleStyle}>
                        {strings.Location}
                    </b>
                </label>
            </Stack>
            <Dropdown 
                id='ddRegion' 
                aria-labelledby='gcx-as-location-label'
                styles={{title: { borderColor: borderColor }}} 
                options={props.cityList} 
                onChange={(e, option) => { 
                    if (option) {
                        setCity(option.key.toString());
                    }
                    else {
                        setCity('');
                    }
                }} 
                selectedKey={city ? parseInt(city, 10) : null} 
            /><br />

            <Stack horizontal verticalAlign='center'>
                <label id='gcx-as-duration-label'>
                    <b style={titleStyle}>
                        {strings.Duration}
                    </b>
                </label>
            </Stack>

            <Stack horizontal verticalAlign='center' styles={stackStyles} tokens={stackTokensDuration}>
                <Dropdown 
                    id='ddDurationOperator' 
                    aria-labelledby='gcx-as-duration-label'
                    styles={{title: { borderColor: borderColor }}} 
                    style={{minWidth: '150px'}}
                    options={props.durationOperatorsList} 
                    onChange={(e, option) => { 
                        if (option) {
                            setDurationOperator(option.key.toString());
                        }
                        else {
                            setDurationOperator('');
                        }
                    }} 
                    selectedKey={durationOperator ? parseInt(durationOperator, 10) : null} 
                />
                <label id='gcx-as-duration-quantity-label'>
                    <b style={titleStyle}>
                        {strings.durationAmount}
                    </b>
                </label>
                <TextField 
                    type='number'
                    min={1}
                    max={12}
                    id='txtDurationQuantity' 
                    aria-labelledby='gcx-as-duration-quantity-label'
                    styles={{fieldGroup: { borderColor: borderColor }}}  
                    onChange={(e) => setDurationQuantity(e.currentTarget.value)} 
                    value={durationQuantity} 
                />
                <label id='gcx-as-duration-units-label'>
                    <b style={titleStyle}>
                        {strings.durationUnit}
                    </b>
                </label>
                <Dropdown 
                    id='ddDuration' 
                    aria-labelledby='gcx-as-duration-units-label'
                    styles={{title: { borderColor: borderColor }}} 
                    style={{minWidth: '100px'}}
                    options={props.durationList} 
                    onChange={(e, option) => { 
                        if (option) {
                            setDuration(option.key.toString());
                        }
                        else {
                            setDuration('');
                        }
                    }} 
                    selectedKey={duration ? parseInt(duration, 10) : null} 
                />
            </Stack>
            <br />

            <Stack horizontal verticalAlign='center' horizontalAlign="end" tokens={stackTokens}>
                <DefaultButton 
                    id='advancedSearch-Clear'
                    aria-label={strings.btnClearAria}
                    onClick={() => {
                        ClearValues();
                    }}
                >
                    {strings.Clear}
                </DefaultButton>

                <PrimaryButton 
                    id='advancedSearch-Search'
                    aria-label={strings.btnSearchAria}
                >
                    {strings.Search}
                </PrimaryButton>
            </Stack>
        </Stack>
        </>
    );
}

export default  SearchForm