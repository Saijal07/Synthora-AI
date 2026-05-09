package com.contentforge.dto;

import com.contentforge.entity.ContentJob;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ContentRequest {

    @NotNull(message = "Generator type is required")
    private ContentJob.GeneratorType generatorType;

    @NotBlank(message = "Topic is required")
    @Size(min = 3, max = 500, message = "Topic must be between 3 and 500 characters")
    private String topic;

    @Size(max = 200, message = "Keywords too long")
    private String keywords;

    private String tone;

    @Size(max = 1000, message = "Extra input too long")
    private String extraInput;
}