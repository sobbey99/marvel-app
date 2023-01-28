import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';


import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from "../appBanner/AppBanner";

import './SingleCharPage.scss'

const SingleCharPage = () => {
    const {charId} = useParams();
    const [char, setChar] = useState(null);
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [charId])

    const updateChar = () => {
        clearError();
        getCharacter(charId)
            .then(onCharLoaded);
    }

    const onCharLoaded = (char) => {
        console.log(char);
        setChar(char)
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <>
        
           <AppBanner />

           <Link to={`/`} className="button button__secondary" style={{marginTop: 50}}>
                    <div className="inner">Go Back</div>
            </Link>
           {errorMessage}
           {spinner}
           {content} 
           
           
        </>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail} = char;

    return (
       <div className="single__char-wrapper">
        <Helmet>
            <meta
                name="description"
                content={`${name} character description`}
                />
            <title>{name} Page</title>
        </Helmet>
        
            <div className="single__char-img">
                <img src={thumbnail} alt={name} />
            </div>

            <div className="single__char-descr">
                    <h1 className="single__char-title">
                        {name}
                    </h1>
                    <p className="single__char-text">
                        {description}
                    </p>
            </div>
       </div>
    )
}

export default SingleCharPage;