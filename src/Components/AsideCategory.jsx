import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Slider from '@mui/material/Slider';
import CheckboxCategory from './Checkboxcategory';
export function AsideCategory({categories , selectedCategories , handleCategoryChange ,priceRange ,handlePriceChange,value,setValue,setCurrentPage}){
    return(
    <aside className="w-full md:w-72 lg:block space-y-10">
            <div>
                <h3 className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: '#C8A882' }}>
                Categories
                </h3>
                <div className="space-y-4" style={{ color: 'rgba(240,236,228,0.6)' }}>
                {categories.map((category, i) => (
                    <label
                    key={i}
                    className="flex items-center gap-3 cursor-pointer transition"
                    style={{ color: 'rgba(240,236,228,0.6)' }}
                    >
                    
                    <CheckboxCategory onChange={() => handleCategoryChange(category)} checked={selectedCategories.includes(category)} />
                    {category}
                    </label>
                ))}
                </div>
            </div>
            {/* PRICE */}
            <div>
                <h3 className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: '#C8A882' }}>
                Price Range
                </h3>
                <div className="space-y-3">
                <Box sx={{ width: 200 }}>
                    <Slider
                        value={priceRange}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={2500}
                            sx={{
                            color: '#C8A882',
                            '& .MuiSlider-thumb': { backgroundColor: '#C8A882' },
                            '& .MuiSlider-track': { backgroundColor: '#C8A882' },
                            }}
                    />
                    <div className="flex justify-between text-sm" style={{ color: 'rgba(240,236,228,0.5)' }}>
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                    </div>
                </Box>
                </div>
            </div>
            {/* RATING */}
            <div>
                <h3 className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: '#C8A882' }}>
                Rating
                </h3>
                <Box sx={{ '& > legend': { mt: 2 } }}>
                <Rating
                    name="simple-controlled "
                    value={value}
                    onChange={(event, newValue) => {
                    setValue(newValue);
                    setCurrentPage(1);
                    }}
                    sx={{
                    color: "#C8A882",
                    "& .MuiRating-iconEmpty": {
                    color: "#ccc", 
                    },
                }}
                />
                </Box>
            </div>
    </aside>
    )
}