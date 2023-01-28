import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import {useState} from 'react';

import useMarvelService from '../../services/MarvelService';

import './SearchForm.scss'

const SearchForm = (props) => {
    const [char, setChar] = useState(null);
    const {loading, error, getCharacterByName, clearError} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = (name) => {
        clearError();

        getCharacterByName(name)
            .then(onCharLoaded);
    }

    

    const results = !char ? null : char.length > 0 ?
            <div className="char__search-wrapper">
                <div className="char__search-success">
                    There is! Visit {char[0].name} page?
                </div>
                <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                    <div className="inner">To Page</div>
                </Link>
            </div> : 
            <div className="char__search-error">
                The character was not found. Check the name and try again
            </div>


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
                            .required('Required field!')
                })
            }

            onSubmit = {({searchInput})  => {
                updateChar(searchInput)
            }}
            >
                <Form>
                
                    <div className="search-wrapper">
                        <Field 
                        id="searchInput"
                        name="searchInput"
                        type="text"
                        placeholder="Enter name"
                        />
                    
                        <button className='button button__main' type='submit'>
                            <div className="inner">
                            {props.BtnSearch}
                            </div>
                        </button>
                    </div>
                    <ErrorMessage className="error" name="searchInput"
            component="div"/>
                    
                </Form>
               


            </Formik>
            {results}
        </div>
    )
}

export default SearchForm;