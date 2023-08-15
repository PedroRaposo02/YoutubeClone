import { useState } from "react";
import { Stack } from "@mui/material";

import { categories } from "../utils/constants";

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
    
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return <Stack
        direction={"row"}
        sx={{
            overflowY: "auto",
            height: { xs: "auto", md: "95%" },
            flexDirection: { xs: "row", md: "column" },
        }}>
        {categories.map((category, index) => (
            <button
                className="category-btn"
                key={index}
                style={{
                    background: category.name === selectedCategory && '#FC1503',
                    color: "white",
                }}
                onClick={
                    () => setSelectedCategory(category.name)
                }
                onMouseEnter={
                    () => setHoveredIndex(index)
                }
                onMouseLeave={
                    () => setHoveredIndex(null)
                }>
                <span style={{
                    color: category.name === selectedCategory ? '#fff' : '#FC1503',
                    marginRight: "0.8rem",
                }}>{category.icon}</span>
                <span style={{
                    opacity: category.name === selectedCategory || hoveredIndex === index ? 1 : 0.2,
                }}>{category.name}</span>
            </button>
        ))}
    </Stack>;
};

export default Sidebar;