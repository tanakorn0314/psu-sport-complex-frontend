import React from 'react';
import Layout from '../components/layout';
import Banner from '../components/banner';
import Button from '../components/button_primary';

const stadiums = ['tennis', 'basketball', 'table tennis', 'badminton'];


const imgUrl = 'https://static.wixstatic.com/media/84770f_98e3c16564e8460f928638971295c790.jpg/v1/fill/w_980,h_735,al_c,q_85,usm_0.66_1.00_0.01/84770f_98e3c16564e8460f928638971295c790.webp';
const bannerHeight = 400;

const BookOnline = () => (
    <Layout>
        <Banner height={bannerHeight} img={imgUrl} />
        <main className='main'>
            <h1>Book Online</h1>
            <form>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                stadium
                        </td>
                            <td>
                                <select name='stadium'>
                                    {stadiums.map((stadium, index) => <option key={index} value={stadium}>{stadium}</option>)}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                court
                        </td>
                            <td>
                                <select name='stadium'>
                                    {stadiums.map((stadium, index) => <option key={index} value={stadium}>{stadium}</option>)}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                start time
                        </td>
                            <td>
                                <input type='datetime-local' onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>finish time</td>
                            <td><input type='datetime' /></td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <Button>book</Button>
            <iframe src={`https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=tanakorn0412%40gmail.com&amp;color=%2329527A&amp;ctz=Asia%2FBangkok`}  width="800" height="600" frameborder="0" scrolling="no"></iframe>
        </main>
        <style jsx>{`
            .main {
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                flex-direction: column;
                padding: 20px
            }
            iframe {
            }
        `}</style>
    </Layout>
);

const handleChange = (e) => {
    const { value } = e.target;
    console.log(value);
    console.log(new Date(value));
}

export default BookOnline;