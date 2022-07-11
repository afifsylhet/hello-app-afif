import React, { useEffect, useState } from 'react';

import { ReactComponent as SearchIcon } from './assets/Search.svg'
import { ReactComponent as LeftIcon } from './assets/ChevronLeft.svg'
import { ReactComponent as RightIcon } from './assets/ChevronRight.svg'
import { ReactComponent as FirstIcon } from './assets/FirstPage.svg'
import { ReactComponent as LastIcon } from './assets/LastPage.svg'
import { ReactComponent as SelectIcon } from './assets/CaretDown.svg'
import { ReactComponent as SortIcon } from './assets/Sort.svg'
import './Home.css'

const Home = (props) => {
    const items = props.items
    const [steps, setSteps] = useState(1);
    const [selectValue, setSelectValue] = useState(10);
    const [randerItem, setRanderItem] = useState([]);
    const [searchText, setSearchText] = useState("")
    const [sorting, setSorting] = useState(false)
    const [data, setData] = useState([]);
    const [toggle, setToggle] = useState(false);


    const searchValue = (e) => {
        const text = e.target.value;
        const upperCase = text.charAt(0).toUpperCase() + text.slice(1)
        setSearchText(upperCase)
    }

    const searchedItem = items.filter(item => item.name.startsWith(searchText) || item.country.startsWith(searchText) || item.capital.startsWith(searchText) || item.nameAscii.startsWith(searchText) || item.countryIso3.startsWith(searchText));


    let middleware = searchedItem;


    const getSelectValue = async (e) => {
        const hello = e.target.value;
        const integer = parseInt(hello)
        setSelectValue(integer)
        setSteps(1)

        const lastIndex = steps * selectValue
        const firstIndex = lastIndex - selectValue;
        const arr = middleware.slice(firstIndex, lastIndex)
        setRanderItem(arr)
    }

    const moveForward = () => {
        const lastIndex = steps * selectValue
        const firstIndex = lastIndex - selectValue;
        setSteps(steps + 1)
        const arr = middleware.slice(firstIndex, lastIndex)
        setRanderItem(arr)
    }

    const moveBackwaord = () => {
        const lastIndex = steps * selectValue
        const newLastIndex = lastIndex - selectValue;
        const newFristIndex = newLastIndex - selectValue;
        const arr = middleware.slice(newFristIndex, newLastIndex)
        setRanderItem(arr)
        setSteps(steps - 1)

    }

    const moveFrist = () => {
        const arr = middleware.slice(0, selectValue)
        setRanderItem(arr)
    }

    const moveLast = () => {
        const size = middleware.length;
        const bolo = size % selectValue;
        let firstOfLast = 0;
        (bolo === 0) ? (firstOfLast = size - selectValue) : (firstOfLast = size - bolo);
        (bolo === 0) ? (setSteps(size / selectValue)) : (setSteps((size / selectValue) + 1));
        const arr = middleware.slice(firstOfLast, size)
        setRanderItem(arr)
    }


    // Sort Section


    const toggleTime = () => {
        const newToggle = !toggle;
        setToggle(newToggle);
        setData((preData) =>
            preData.sort((a, b) => {
                return newToggle
                    ? a.population - b.population
                    : b.population - a.population;
            })
        );
    };


    function filter_array(test_array) {
        var index = -1,
            arr_length = test_array ? test_array.length : 0,
            resIndex = -1,
            result = [];

        while (++index < arr_length) {
            var value = test_array[index];

            if (value) {
                result[++resIndex] = value;
            }
        }

        return result;
    }



    const numberSort = async (arr) => {
        if (!sorting) {
            const ab = filter_array(arr)
            toggleTime()


            // const hello = await ab.sort((a, b) => a.population - b.population)
            // middleware = hello;
            console.log("assending Clicked")
            // setSorting(true)
        } else {
            const ab = filter_array(arr)
            toggleTime()

            // const hello = await ab.sort((a, b) => b.population - a.population)
            // middleware = hello;
            console.log("dessending Clicked")
            // setSorting(false)
        }
    }


    const stringAssSort = () => {
        const assSort = middleware.sort()
        middleware = assSort
        console.log("clicked ass")
    }

    const stringDssSort = () => {
        const assSort = middleware.sort((a, b) => (a > b ? -1 : 1))
        middleware = assSort
        console.log("clicked Dss")
    }


    return (
        <div style={{ backgroundColor: "#fafafa", color: 'gray' }}>
            <div className="container mx-auto">
                <br />
                <br />

                {/* Top Search bar */}

                <div className="flex justify-center">
                    <div className=" w-3/5 flex">
                        <SearchIcon className='relative top-4 left-6' />
                        <input
                            type="text"
                            placeholder="Search for a city"
                            className="py-3 pl-8 w-full rounded-md"
                            style={{ backgroundColor: '#f4f4f3', borderBottom: '1px solid #a5a5a88', fontFamily: 'Font Awesome 6 free' }}
                            onChange={searchValue}
                        />
                    </div>
                </div>

                {/* table saction */}

                <br />
                <br />

                <div className="flex justify-center overflow-x-scroll " style={{ minWidth: '1144px' }}>
                    <table >
                        <thead>
                            <tr style={{ backgroundColor: '#f4f4f3' }}>
                                <th className="p-2 w-48 text-left" style={{ borderTop: '1px solid #a5a5a8' }}>Name
                                    <SortIcon className="inline mx-2 cursor-pointer" style={{ opacity: '50%' }}
                                        onClick={(randerItem[0] > randerItem[1] > randerItem[2]) ? stringAssSort : stringDssSort}
                                    />
                                </th>
                                <th className="p-2 w-48 text-left" style={{ borderTop: '1px solid #a5a5a8' }}>Name Ascii
                                    <SortIcon className="inline mx-2 cursor-pointer" style={{ opacity: '50%' }}
                                        onClick={(randerItem[0] > randerItem[1] > randerItem[2]) ? stringAssSort : stringDssSort}
                                    />
                                </th>
                                <th className="p-2 w-48 text-left" style={{ borderTop: '1px solid #a5a5a8' }}>Country
                                    <SortIcon className="inline mx-2 cursor-pointer" style={{ opacity: '50%' }}
                                        onClick={(randerItem[0] > randerItem[1] > randerItem[2]) ? stringAssSort : stringDssSort}
                                    />
                                </th>
                                <th className="p-2 w-48 text-left" style={{ borderTop: '1px solid #a5a5a8' }}>Country Iso3
                                    <SortIcon className="inline mx-2 cursor-pointer" style={{ opacity: '50%' }}
                                        onClick={(randerItem[0] > randerItem[1] > randerItem[2]) ? stringAssSort : stringDssSort}
                                    />
                                </th>
                                <th className="p-2 w-48 text-left" style={{ borderTop: '1px solid #a5a5a8' }}>Capital
                                    <SortIcon className="inline mx-2 cursor-pointer" style={{ opacity: '50%' }}
                                        onClick={(randerItem[0] > randerItem[1] > randerItem[2]) ? stringAssSort : stringDssSort}
                                    />
                                </th>
                                <th className="p-2 w-48 text-left" style={{ borderTop: '1px solid #a5a5a8' }}>population
                                    <SortIcon className="inline mx-2 cursor-pointer" style={{ opacity: '50%' }}
                                        onClick={() => numberSort(middleware)}
                                    />
                                </th>
                            </tr>
                        </thead>

                        {/* Table body */}

                        <tbody style={{ borderBottom: '1px solid #a5a5a8' }}>

                            {
                                randerItem?.map(item => <tr key={item.id}>
                                    <td className="px-2 py-3 w-48" style={{ borderTop: '1px solid #a5a5a8' }}>{item.name}</td>
                                    <td className="px-2 py-3 w-48" style={{ borderTop: '1px solid #a5a5a8' }}>{item.nameAscii}</td>
                                    <td className="px-2 py-3 w-48" style={{ borderTop: '1px solid #a5a5a8' }}>{item.country}</td>
                                    <td className="px-2 py-3 w-48" style={{ borderTop: '1px solid #a5a5a8' }}>{item.countryIso3}</td>
                                    <td className="px-2 py-3 w-48" style={{ borderTop: '1px solid #a5a5a8' }}>{item.capital}</td>
                                    <td className="px-2 py-3 w-48" style={{ borderTop: '1px solid #a5a5a8' }}>{item.population}</td>

                                </tr>)
                            }





                            {/* Table Footer */}


                            <tr style={{ backgroundColor: '#f4f4f3' }}>
                                <td className="p-2 font-semibold" style={{ borderTop: '1px solid #a5a5a8' }}>Per page

                                    <SelectIcon className="inline relative left-20 m-0 p-0" style={{ opacity: '50%', marginTop: '-7px' }} />

                                    <select
                                        className=" mx-2 p-2 pr-10 styledSelect"
                                        style={{ border: '0px', outline: '0px', backgroundColor: '#fafafa', borderBottom: '1px solid #525258' }}
                                        onChange={getSelectValue}
                                    >
                                        <option>10</option>
                                        <option>20</option>
                                        <option>30</option>
                                        <option>40</option>
                                        <option>50</option>
                                        <option>60</option>
                                        <option>70</option>
                                        <option>80</option>
                                        <option>90</option>
                                        <option>100</option>
                                    </select>
                                </td>

                                <td className="px-2 py-3 w-48" style={{ borderTop: '1px solid #a5a5a8' }}>Hello</td>
                                <td className="px-2 py-3 w-48" style={{ borderTop: '1px solid #a5a5a8' }}>Hello</td>
                                <td className="px-2 py-3 w-48" style={{ borderTop: '1px solid #a5a5a8' }}>Hello</td>
                                <td className="px-2 py-3 w-48" style={{ borderTop: '1px solid #a5a5a8' }}>Hello</td>


                                <td className="px-2 py-3 w-48" style={{ borderTop: '1px solid #a5a5a8' }}>
                                    <div className="flex justify-end">
                                        <FirstIcon className='mx-1' style={{ opacity: "50%" }}
                                            onClick={moveFrist}
                                        />

                                        <LeftIcon className='mx-1' style={{ opacity: "50%" }}
                                            onClick={moveBackwaord}
                                        />

                                        <RightIcon className='mx-1'
                                            onClick={moveForward}
                                        />

                                        <LastIcon className='mx-1'
                                            onClick={moveLast}
                                        />
                                    </div>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <br />
            <br />


        </div >
    );
};

export default Home;