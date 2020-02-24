import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip
} from '@material-ui/core';

const useStyles = makeStyles({
  chip: {
    marginRight: '0.5rem'
  }
});

function Tags({ value, onChange, label, options }) {
  const classes = useStyles();

  return (
    <FormControl fullWidth className="tags">
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <Select
        multiple
        value={value}
        onChange={onChange}
        input={<Input id="select-input" />}
        renderValue={selected => (
          <div className="chips">
            {selected.map(value => (
              <Chip
                key={value}
                label={value}
                size="small"
                className={classes.chip}
              />
            ))}
          </div>
        )}
      >
        {options.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default Tags;
