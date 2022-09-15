import { render } from '@testing-library/react';
import { MemoryRouter, Route, Router } from 'react-router-dom';
import Pagination from '../components/pagination/Pagination';

describe('Pagination', () => {
  const props = {
    postsPerPage: 10,
    totalPosts: 50,
    paginate: new Function(),
  };

  it('Show paginator', () => {
    const component = render(
      <MemoryRouter initialEntries={[{ pathname: '/home' }]}>
        <Route>
          <Pagination
            postsPerPage={props.postsPerPage}
            totalPosts={props.totalPosts}
            paginate={props.paginate}
          />
        </Route>
      </MemoryRouter>
    );
    const paginator = component.container.querySelector('#pagination');
    expect(paginator).toBeDefined();
  });

  it('renderize correctly the page number', () => {
    const component = render(
      <MemoryRouter initialEntries={[{ pathname: '/home' }]}>
        <Route>
          <Pagination
            postsPerPage={props.postsPerPage}
            totalPosts={props.totalPosts}
            paginate={props.paginate}
          />
        </Route>
      </MemoryRouter>
    );
    const paginator = component.container.querySelectorAll('.page-item');
    expect(paginator.length).toBe(5);
  });
});
