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
public class RecordRequest {

    @NotEmpty
    private int team;

    @NotEmpty
    private int quarter;

    @NotEmpty
    private int score;

    @NotEmpty
    private String userEmail;

    @NotEmpty
    private Long gameId;

}
