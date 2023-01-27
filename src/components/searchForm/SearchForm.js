import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import './SearchForm.scss'

const SearchForm = (props) => {
    return (
        <div className='charSearch'>
            <h4>{props.titleSearch}</h4>
            <Formik
            initialValues={{
                searchInput: ''
            }}

            validationSchema = {
                Yup.object({
                    searchInput: Yup.string()
                            .min(3, 'Enter minimum 3 symbols!')
                            .required('Required field!')
                })
            }

            onSubmit = {
                values => console.log(JSON.stringify(values, null, 2))
            }
            >
                <Form>
                
                    <div className="search-wrapper">
                        <Field 
                        id="searchInput"
                        name="searchInput"
                        type="text"
                        placeholder="Enter name"
                        />
                    
                        <button className='button button__main'>
                            <div className="inner">
                            {props.BtnSearch}
                            </div>
                        </button>
                    </div>
                    <ErrorMessage className="error" name="searchInput"
            component="div"/>
                    
                </Form>
               


            </Formik>
        </div>
    )
}

export default SearchForm;