import React, { useState } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form onSubmit={submitHandler}  className='lg-py-0 xl-py-0 py-0 mt-3'>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Buscar..."
          aria-label="Search"
          aria-describedby="Search"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <InputGroup.Append>
          <InputGroup.Text className='p-0 m-0'>
            <Button type="submit" className={'small'}>
              <h6 className='d-none d-sm-none d-lg-visible-inline-block d-xl-inline-block text-light m-xl-0'>Buscar</h6>
              <i className='fas fa-search p-0 m-xs-n2 ml-xl-2 '></i>
            </Button>
          </InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};

export default SearchBox;
