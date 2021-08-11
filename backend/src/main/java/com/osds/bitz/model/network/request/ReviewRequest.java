package com.osds.bitz.model.network.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ReviewRequest {

    @NotEmpty
    private String email;

    @NotEmpty
    private Long gameId;

    private String mvp;

    private String goodPeople[];

    private String badPeople[];

    @NotEmpty
    private Long gymId;

    @NotEmpty
    private int rate;

}
